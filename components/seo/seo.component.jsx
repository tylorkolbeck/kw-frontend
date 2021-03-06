import Head from 'next/head'

const Seo = ({ seo, global, title }) => {
  const seoDefaults = {
    seo: seo ? seo : global
  }

  const fullSeo = {
    ...seoDefaults,

    // Add title suffix
    metaTitle: `${seoDefaults.seo.metaTitle}`,
    metaDescription: seoDefaults.seo.metaDescription,

    // Get full image URL
    shareImage: seo?.shareImage?.formats?.thumbnail?.url
  }

  return (
    <Head>
      {fullSeo.metaTitle && (
        <>
          <title>{title ? title : fullSeo.seo.metaTitle}</title>
          <meta property="og:title" content={fullSeo.metaTitle} />
          <meta name="twitter:title" content={fullSeo.metaTitle} />
          <meta propert="og:type" content="website" />
        </>
      )}
      {fullSeo.metaDescription && (
        <>
          <meta name="description" content={fullSeo.metaDescription} />
          <meta property="og:description" content={fullSeo.metaDescription} />
          <meta name="twitter:description" content={fullSeo.metaDescription} />
        </>
      )}
      {fullSeo.shareImage && (
        <>
          <meta property="og:image" content={fullSeo.shareImage} />
          <meta name="twitter:image" content={fullSeo.shareImage} />
          <meta name="image" content={fullSeo.shareImage} />
        </>
      )}
      {fullSeo.article && <meta property="og:type" content="article" />}
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  )
}

export default Seo
