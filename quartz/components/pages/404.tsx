import { i18n } from "../../i18n";
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types";

const NotFound: QuartzComponent = ({ cfg, allFiles }: QuartzComponentProps) => {
  const url = new URL(`https://${cfg.baseUrl ?? "example.com"}`);
  const baseDir = url.pathname;

  const scriptContent = `
    document.addEventListener("DOMContentLoaded", function () {
      const allFiles = ${JSON.stringify(allFiles)};
      const pathname = window.location.pathname;
      const noteName = pathname.split('/').pop();
      const heading = document.getElementById('heading');
      const redirectMessage = document.getElementById('redirect-message');
      const errorMessage = document.getElementById('error-message');
      
      if (noteName) {
        const matchingFile = allFiles.find(file => file.slug.split('/').pop() === noteName);
        if (matchingFile) {
          heading.textContent = 'Wait...';
          redirectMessage.style.display = 'block';
          errorMessage.style.display = 'none';
          window.location.href = \`\${window.location.origin}/\${matchingFile.slug}\`;
        } else {
          heading.textContent = '404';
          errorMessage.style.display = 'block';
          redirectMessage.style.display = 'none';
        }
      }
    });
  `;

  return (
    <article class="popover-hint">
      <h1 id="heading">Wait...</h1>
      <p id="redirect-message" style={{ display: "none" }}>The page has moved, redirecting you...</p>
      <p id="error-message" style={{ display: "none" }}>{i18n(cfg.locale).pages.error.notFound}</p>
      <a href={baseDir}>{i18n(cfg.locale).pages.error.home}</a>
      <script dangerouslySetInnerHTML={{ __html: scriptContent }}></script>
    </article>
  );
}

export default (() => NotFound) satisfies QuartzComponentConstructor;