"use client";

import { useState } from "react";

import { Checkbox, Slider } from "@/components/ui";

export const FilterList = () => {
  const [range, setRange] = useState({ from: 10, to: 100 });
  const [workFormat, setWorkFormat] = useState({
    remote: false,
    office: false,
    hybrid: false,
  });
  const [employmentType, setEmploymentType] = useState({
    fullTime: false,
    partTime: false,
    projectBased: false,
  });
  const [companyType, setCompanyType] = useState({
    product: false,
    agency: false,
    startup: false,
    outsourcing: false,
    outstaffing: false,
    gameDev: false,
  });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="mb-4">
          <h3 className="heading-h3">Заробітна плата ($)</h3>
        </div>
        <Slider
          min={0}
          max={100}
          fromValue={range.from}
          toValue={range.to}
          onChange={(from, to) => setRange({ from, to })}
        />
      </div>

      {/* // ToDo: fix range Slider (margin bottom issue) */}
      <br />

      <div className="flex flex-col">
        <div className="mb-4">
          <h3 className="heading-h3">Формат роботи</h3>
        </div>

        <div className="space-y-4">
          <Checkbox
            name="remote"
            labelMessage="Віддалено"
            checked={workFormat.remote}
            onChange={(e) => {
              setWorkFormat((prev) => ({ ...prev, remote: e.target.checked }));
            }}
          />
          <Checkbox
            name="office"
            labelMessage="Офіс"
            checked={workFormat.office}
            onChange={(e) => {
              setWorkFormat((prev) => ({ ...prev, office: e.target.checked }));
            }}
          />
          <Checkbox
            name="hybrid"
            labelMessage="Гібридний"
            checked={workFormat.hybrid}
            onChange={(e) => {
              setWorkFormat((prev) => ({ ...prev, hybrid: e.target.checked }));
            }}
          />
        </div>
      </div>

      <div className="flex flex-col">
        <div className="mb-4">
          <h3 className="heading-h3">Тип зайнятості</h3>
        </div>

        <div className="space-y-4">
          <Checkbox
            name="full-time"
            labelMessage="Повна зайнятість"
            checked={employmentType.fullTime}
            onChange={(e) => {
              setEmploymentType((prev) => ({ ...prev, fullTime: e.target.checked }));
            }}
          />
          <Checkbox
            name="part-time"
            labelMessage="Часткова зайнятість"
            checked={employmentType.partTime}
            onChange={(e) => {
              setEmploymentType((prev) => ({ ...prev, partTime: e.target.checked }));
            }}
          />
          <Checkbox
            name="project-based"
            labelMessage="Проектна зайнятість"
            checked={employmentType.projectBased}
            onChange={(e) => {
              setEmploymentType((prev) => ({ ...prev, projectBased: e.target.checked }));
            }}
          />
        </div>
      </div>

      <div className="flex flex-col">
        <div className="mb-4">
          <h3 className="heading-h3">Тип компанії</h3>
        </div>

        <div className="space-y-4">
          <Checkbox
            name="product"
            labelMessage="Продуктова"
            checked={companyType.product}
            onChange={(e) => {
              setCompanyType((prev) => ({ ...prev, product: e.target.checked }));
            }}
          />
          <Checkbox
            name="agency"
            labelMessage="Агенція"
            checked={companyType.agency}
            onChange={(e) => {
              setCompanyType((prev) => ({ ...prev, agency: e.target.checked }));
            }}
          />
          <Checkbox
            name="startup"
            labelMessage="Стартап"
            checked={companyType.startup}
            onChange={(e) => {
              setCompanyType((prev) => ({ ...prev, startup: e.target.checked }));
            }}
          />
          <Checkbox
            name="outsourcing"
            labelMessage="Аутсорсинг"
            checked={companyType.outsourcing}
            onChange={(e) => {
              setCompanyType((prev) => ({ ...prev, outsourcing: e.target.checked }));
            }}
          />
          <Checkbox
            name="outstaffing"
            labelMessage="Aутстаффінг"
            checked={companyType.outstaffing}
            onChange={(e) => {
              setCompanyType((prev) => ({ ...prev, outstaffing: e.target.checked }));
            }}
          />
          <Checkbox
            name="game-dev"
            labelMessage="GameDev"
            checked={companyType.gameDev}
            onChange={(e) => {
              setCompanyType((prev) => ({ ...prev, gameDev: e.target.checked }));
            }}
          />
        </div>
      </div>
    </div>
  );
};
