import Script from "next/script";

/**
 * Loads an analytics destination only when the owner configures one through
 * environment variables. Nothing loads by default and no IDs live in code.
 *
 *   NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX   Google Tag Manager container
 *   NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX  GA4 directly (used only if no GTM ID)
 */
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID?.trim() ?? "";
const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID?.trim() ?? "";

const validGtm = /^GTM-[A-Z0-9]{4,12}$/.test(GTM_ID);
const validGa4 = /^G-[A-Z0-9]{4,16}$/.test(GA4_ID);

export default function AnalyticsScripts() {
  if (validGtm) {
    return (
      <Script id="gtm" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];window.dataLayer.push({'gtm.start':Date.now(),event:'gtm.js'});var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtm.js?id=${GTM_ID}';document.head.appendChild(s);`}
      </Script>
    );
  }
  if (validGa4) {
    return (
      <>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`} strategy="afterInteractive" />
        <Script id="ga4" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments);};gtag('js',new Date());gtag('config','${GA4_ID}');`}
        </Script>
      </>
    );
  }
  return null;
}
