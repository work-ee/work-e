"use server";

import { cache } from "react";

import fs from "fs/promises";
import path from "path";

import { IJob } from "@/types/jobs";

// React cache for deduplication across the same request
export const getJobsData = cache(async (): Promise<IJob[]> => {
  try {
    const filePath = path.join(process.cwd(), "public", "data", "jobs.json");
    const file = await fs.readFile(filePath, "utf8");
    const jobs: IJob[] = JSON.parse(file);
    return jobs;
  } catch (error) {
    console.error("Error reading jobs data:", error);
    throw new Error("Failed to load jobs data");
  }
});

/**
 * Get a specific job by slug
 */
export const getJobBySlug = cache(async (slug: string): Promise<IJob | null> => {
  try {
    const jobs = await getJobsData();
    return jobs.find((job) => job.slug === slug) || null;
  } catch (error) {
    console.error("Error getting job by slug:", error);
    return null;
  }
});

/**
 * Get all jobs
 */
export const getAllJobs = cache(async (): Promise<IJob[]> => {
  try {
    return await getJobsData();
  } catch (error) {
    console.error("Error getting all jobs:", error);
    return [];
  }
});

/**
 * Get jobs with pagination
 */
export const getJobsPaginated = cache(
  async (
    page: number = 1,
    limit: number = 10
  ): Promise<{
    jobs: IJob[];
    total: number;
    totalPages: number;
    currentPage: number;
    hasMore: boolean;
  }> => {
    try {
      const allJobs = await getJobsData();
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const totalPages = Math.ceil(allJobs.length / limit);

      return {
        jobs: allJobs.slice(startIndex, endIndex),
        total: allJobs.length,
        totalPages,
        currentPage: page,
        hasMore: endIndex < allJobs.length,
      };
    } catch (error) {
      console.error("Error getting paginated jobs:", error);
      return {
        jobs: [],
        total: 0,
        totalPages: 0,
        currentPage: page,
        hasMore: false,
      };
    }
  }
);

/**
 * Search jobs by query
 */
export const searchJobs = cache(async (query: string): Promise<IJob[]> => {
  try {
    if (!query.trim()) return [];

    const jobs = await getJobsData();
    const lowercaseQuery = query.toLowerCase();

    return jobs.filter(
      (job) =>
        job.body.title.toLowerCase().includes(lowercaseQuery) ||
        job.body.company.toLowerCase().includes(lowercaseQuery) ||
        job.body.text.toLowerCase().includes(lowercaseQuery) ||
        job.body.location?.toLowerCase().includes(lowercaseQuery)
    );
  } catch (error) {
    console.error("Error searching jobs:", error);
    return [];
  }
});

/**
 * Get jobs by company
 */
export const getJobsByCompany = cache(async (company: string): Promise<IJob[]> => {
  try {
    const jobs = await getJobsData();
    return jobs.filter((job) => job.body.company.toLowerCase() === company.toLowerCase());
  } catch (error) {
    console.error("Error getting jobs by company:", error);
    return [];
  }
});

/**
 * Get jobs by type
 */
export const getJobsByType = cache(async (type: IJob["type"]): Promise<IJob[]> => {
  try {
    const jobs = await getJobsData();
    return jobs.filter((job) => job.type === type);
  } catch (error) {
    console.error("Error getting jobs by type:", error);
    return [];
  }
});

/**
 * Get recent jobs (last N jobs)
 */
export const getRecentJobs = cache(async (limit: number = 5): Promise<IJob[]> => {
  try {
    const jobs = await getJobsData();
    // Assuming jobs are ordered by date (newest first)
    return jobs.slice(0, limit);
  } catch (error) {
    console.error("Error getting recent jobs:", error);
    return [];
  }
});

/**
 * Get all unique companies
 */
export const getCompanies = cache(async (): Promise<string[]> => {
  try {
    const jobs = await getJobsData();
    const companies = [...new Set(jobs.map((job) => job.body.company))];
    return companies.sort();
  } catch (error) {
    console.error("Error getting companies:", error);
    return [];
  }
});

/**
 * Get all job slugs for static generation
 */
export const getJobSlugs = cache(async (): Promise<string[]> => {
  try {
    const jobs = await getJobsData();
    return jobs.map((job) => job.slug);
  } catch (error) {
    console.error("Error getting job slugs:", error);
    return [];
  }
});

/**
 * Get job statistics
 */
export const getJobStats = cache(
  async (): Promise<{
    total: number;
    byType: Record<string, number>;
    byCompany: Record<string, number>;
  }> => {
    try {
      const jobs = await getJobsData();

      const byType = jobs.reduce(
        (acc, job) => {
          const type = job.type?.map((t) => t) || ["unknown"];
          type.forEach((t) => {
            acc[t] = (acc[t] || 0) + 1;
          });
          return acc;
        },
        {} as Record<string, number>
      );

      const byCompany = jobs.reduce(
        (acc, job) => {
          acc[job.body.company] = (acc[job.body.company] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>
      );

      return {
        total: jobs.length,
        byType,
        byCompany,
      };
    } catch (error) {
      console.error("Error getting job stats:", error);
      return {
        total: 0,
        byType: {},
        byCompany: {},
      };
    }
  }
);
