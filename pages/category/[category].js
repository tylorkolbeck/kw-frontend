import React from 'react'
import { Grid, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { getAllCategoryNames, getArticlesByCategory } from '../../lib/category'
import ArticleCard from '../../components/card/articleCard.component'
import { fetchAPI } from '../../lib/api'
import PageHeader from '../../components/Typography/PageHeader/PageHeader.component'
import BackButton from '../../components/BackButton/BackButton.component'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: theme.custom.screen.maxWidth,
    margin: '0 auto',
    padding: theme.spacing(3)
  }
}))

export default function Category({ categoryData, authors, categories }) {
  const classes = useStyles()
  const { name, articles } = categoryData

  const sortedArticles = articles
    ? articles.sort(
        (a, b) => new Date(b.published_at) - new Date(a.published_at)
      )
    : []

  return (
    <div>
      <PageHeader
        title={name?.toUpperCase()}
        subtitle={`Browse ${name} articles `}
      />
      <div className={classes.root}>
        <BackButton />

        <Grid container direction="column">
          {sortedArticles &&
            sortedArticles.map((article) => {
              const author = authors.find(
                (author) => author.id === article.author
              )

              const category = categories.find(
                (cat) => cat.id === article.category
              )
              return (
                <Grid item xs={12} key={article.title}>
                  <div
                    style={{ padding: '20px', marginBottom: '20px' }}
                    elevation={1}
                  >
                    <ArticleCard
                      article={article}
                      noCategory
                      category={category}
                      image={article?.image}
                      description={article.description}
                      authorName={author?.name ? author?.name : 'Faceless Man'}
                    />
                  </div>
                </Grid>
              )
            })}
        </Grid>
      </div>
    </div>
  )
}

export async function getStaticPaths() {
  const paths = await getAllCategoryNames()

  return {
    paths,
    fallback: true
  }
}

export async function getStaticProps({ params }) {
  const categoryArticles = await getArticlesByCategory(params.category)
  const authors = await fetchAPI('/writers')
  const categories = await fetchAPI('/categories')

  return {
    props: {
      categoryData: categoryArticles,
      authors: authors,
      categories: categories
    },
    revalidate: 1
  }
}

Category.defaultProps = {
  categoryData: {},
  authors: []
}
