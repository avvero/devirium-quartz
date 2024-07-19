import { i18n } from "../../i18n"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"

const NotFound: QuartzComponent = ({ cfg, allFiles }: QuartzComponentProps) => {
  // If baseUrl contains a pathname after the domain, use this as the home link
  const url = new URL(`https://${cfg.baseUrl ?? "example.com"}`)
  const baseDir = url.pathname

  const scriptContent = `
    document.addEventListener("DOMContentLoaded", function () {
      const allFiles = ${JSON.stringify(allFiles)};
      const pathname = window.location.pathname;
      const noteName = pathname.split('/').pop();

      if (noteName) {
        const matchingFile = allFiles.find(file => file.slug.split('/').pop() === noteName);
        if (matchingFile) {
          window.location.href = \`\${window.location.origin}/\${matchingFile.slug}\`;
        }
      }
    });
  `;

  return (
    <article class="popover-hint">
      <h1>404</h1>
      <p>{i18n(cfg.locale).pages.error.notFound}</p>
      <a href={baseDir}>{i18n(cfg.locale).pages.error.home}</a>
      <script dangerouslySetInnerHTML={{ __html: scriptContent }}></script>
    </article>
  )
}

export default (() => NotFound) satisfies QuartzComponentConstructor
