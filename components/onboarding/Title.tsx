export const Title = ({ title, subtitle }: { title: string; subtitle: string }) => {
  return (
    <div className="mx-auto mb-12 max-w-6xl text-center">
      <h2 className="heading-h2 text-primary-700 mb-4" dangerouslySetInnerHTML={{ __html: title }} />
      <div className="mx-auto mb-12 max-w-[990px]">
        <p className="mb-4 text-xl font-black" dangerouslySetInnerHTML={{ __html: subtitle }} />
      </div>
    </div>
  );
};
