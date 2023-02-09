//((Parse as any).serverURL as any) = import.meta.env.VITE_VUE_APP_PARSE_URL;

import("parse").then((parse) => {
  console.log("xcvcxvssssssssssxcxvs");
  parse.serverURL = import.meta.env.VITE_VUE_APP_PARSE_URL;
  parse.initialize(
    import.meta.env.VITE_VUE_APP_PARSE_APPLICATION_ID,
    import.meta.env.VITE_VUE_APP_PARSE_JAVASCRIPT_KEY
  );
});
