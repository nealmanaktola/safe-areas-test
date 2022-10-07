import { Dirs, FileSystem } from 'react-native-file-access';

const generateWebviewHtml = (
  iFrameUri: string,
  safeAreas: {
    top: number,
    left: number,
    right: number,
    bottom: number,
  }
) => `
  <!DOCTYPE html>
  <html>
  <head>
      <style>
      body {
          padding: 0;
          margin: 0;
          width: 100vw;
          height: 100vh;
      }
      </style>
      <meta
      name="viewport"
      content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, viewport-fit=cover"
      />
  </head>
  <body>
      <iframe id="activityFrame" width="100%" height="100%" src="${iFrameUri}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
      </iframe>
      <script>
        // Get the root element
        var iframe = document.getElementById("activityFrame");
        iframe.addEventListener("load", () => {
          var doc = iframe.contentWindow.document;
          doc.documentElement.style.setProperty('--discord-safe-area-inset-left', '${safeAreas.left}px');
        	doc.documentElement.style.setProperty('--discord-safe-area-inset-right', '${safeAreas.right}px');
        	doc.documentElement.style.setProperty('--discord-safe-area-inset-top', '${safeAreas.top}px');
        	doc.documentElement.style.setProperty('--discord-safe-area-inset-bottom', '${safeAreas.bottom}px');
        });
      </script> 
  </body>
  </html>
`;

export default async function createWebviewHtmlFile({
  iFrameUri,
  safeAreas,
}: {
  iFrameUri: string;
  safeAreas: {
    top: number,
    left: number,
    right: number,
    bottom: number,
  }
}) {
  const filename = Dirs.CacheDir + '/activity.html';
  const html = generateWebviewHtml(iFrameUri, safeAreas);

  try {
     await FileSystem.writeFile(filename, html, 'utf8');
     const content = await FileSystem.readFile(filename);
     console.log(content)
     return filename;
  } catch (e) {
    console.warn(e)
    return null;
  }
}
