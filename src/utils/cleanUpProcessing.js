// This fixes processing code that breaks processing.js rendering

export default code =>
  code
    .replace(/ortho()/g, "//ortho()")
    .replace(/Integer.MAX_VALUE/g, "width*100")
    .replace(/println/g, "//println");
