export const Footer = () => {
  return (
    <footer className="bg-primary-100 flex min-h-[94px] items-center justify-center py-4">
      <div className="container">
        <div className="label-text text-primary-900 flex gap-26 text-base">
          <p className="text-start">© 2025 Work - E. All rights reserved.</p>
          <ul className="flex gap-8">
            <li>
              <a href="#">Умови користування</a>
            </li>
            <li>
              <a href="#">Підтримати Work-E</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
