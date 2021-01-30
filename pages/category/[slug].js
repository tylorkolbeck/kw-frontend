import Articles from '../../components/article/article.component'
import { fetchAPI } from '../../lib/api'
import Layout from '../../components/layout/layout.component'
import Seo from '../../components/seo/seo.component'

const Category = ({ category, categories }) => {
  const seo = {
    metaTitle: category.name,
    metaDescription: `All ${category.name} articles`
  }

  return (
    <Layout categories={categories}>
      <Seo seo={seo} />
      <div className='uk-section'>
        <div className='uk-container uk-container-large'>
          <h1>{category.name}</h1>
          <Articles articles={category.articles} />
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const categories = await fetchAPI('/categories')
  // THESE CONSOLE LOGS ARE HERE FOR DEBUGGING. CURRENTLY HAVING A BUILD ERROR
  // ONLY IN PRODUCTION

  return {
    paths: categories.map((category) => ({
      params: {
        slug: category.slug
      }
    })),
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const category = (await fetchAPI(`/categories?slug=${params.slug}`))[0]
  const categories = await fetchAPI('/categories')
  // THESE CONSOLE LOGS ARE HERE FOR DEBUGGING. CURRENTLY HAVING A BUILD ERROR
  // ONLY IN PRODUCTION

  return {
    props: { category, categories },
    revalidate: 1
  }
}

export default Category
