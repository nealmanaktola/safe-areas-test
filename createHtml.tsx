import { Dirs, FileSystem } from 'react-native-file-access';

const generateWebviewHtml = (
  iFrameUri: string,
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
  </body>
  </html>
`;

export default async function createWebviewHtmlFile({
  iFrameUri,
}: {
  iFrameUri: string
}) {
  const filename = Dirs.CacheDir + '/activity.html';
  const html = generateWebviewHtml(iFrameUri);

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
