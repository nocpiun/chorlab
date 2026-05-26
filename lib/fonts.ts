import localFont from "next/font/local";

export const notoSansSC = localFont({
  src: [{ path: "../assets/NotoSansSC-VariableFont_wght.ttf", style: "normal" }],
});

export const robotoSlab = localFont({
  src: [{ path: "../assets/RobotoSlab-VariableFont_wght.ttf", style: "normal" }],
});

export const googleSansCode = localFont({
  src: [{ path: "../assets/GoogleSansCode-VariableFont_wght.ttf", style: "normal" }],
  variable: "--font-google-sans-code",
});
