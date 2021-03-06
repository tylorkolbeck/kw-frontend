import { getAllPostsIds, getPostData } from '../../lib/posts'

import Seo from '../../components/seo/seo.component'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import AuthorInfo from '../../components/AuthorInfo/AuthorInfo.component'
import NewsLetterSignup from '../../components/NewsLetterSignUp/NewsLetterSignUp.component'
import BackButton from '../../components/BackButton/BackButton.component'
import CategoryChip from '../../components/Typography/CategoryChip/CategoryChip.component'
import SectionHeader from '../../components/Typography/SectionHeader/SectionHeader.component'
import Markdown from '../../components/Markdown/Markdown.component'
import Description from '../../components/Description/Description.component'
import Link from 'next/link'
import { fetchAPI } from '../../lib/api'
import SocialMediaShare from '../../components/SocialMediaShare/SocialMediaShare.component'

import { useRouter } from 'next/router'

const useStyles = makeStyles((theme) => {
  return {
    root: {
      flexGrow: 1,
      paddingTop: theme.custom.screen.navBarHeight,
      maxWidth: '800px',
      margin: '0 auto'
    },
    content: {
      margin: '0px auto',
      padding: theme.custom.screen.bodyPadding
    },
    divider: {
      background: theme.palette.secondary.light,
      marginTop: '20px'
    },
    authorText: {
      fontWeight: 'bold'
    },
    articleTitle: {
      marginBottom: theme.spacing(2),
      fontWeight: 'bold',
      [theme.breakpoints.down('sm')]: {
        fontSize: '3rem'
      }
    },
    marginBottomMd: {
      marginBottom: theme.spacing(3)
    },
    postBody: {
      marginBottom: theme.spacing(5),
      margin: '20px auto',
      '& img': {
        display: 'block',
        margin: '20px auto'
      },
      color: theme.palette.type === 'light' ? 'rgba(0,0,0,.8)' : 'white'
    },
    imageWrapper: {
      width: '100%',
      position: 'relative'
    },
    fixedRatio: {
      paddingTop: '56.25%' /* 16:9 ratio */,
      backgroundSize: 'cover',
      '-moz-background-size': 'cover' /* Firefox 3.6 */,
      backgroundPosition: 'center' /* Internet Explorer 7/8 */
    }
  }
})

export default function Article({ postData, coinList }) {
  const router = useRouter()
  const classes = useStyles()
  const { title, category, image, description } = postData

  const seo = {
    metaTitle: postData.title,
    metaDescription: description,
    shareImage: image,
    article: true
  }

  return (
    <Grid container className={classes.root}>
      <Seo seo={seo} />

      <Grid item className={classes.content}>
        <BackButton />
        {category && (
          <Link href={`/category/${category.slug}`}>
            <a>
              <CategoryChip>{category.name}</CategoryChip>
            </a>
          </Link>
        )}

        <Grid item container>
          <Grid item className={classes.marginBottomMd}>
            <SectionHeader>{title}</SectionHeader>
          </Grid>
          <Grid item className={classes.imageWrapper}>
            <div
              className={classes.fixedRatio}
              style={{ backgroundImage: `url(${image?.url})` }}
            ></div>
          </Grid>
        </Grid>

        <AuthorInfo
          author={postData?.author}
          published={postData?.updated_at}
          divider
        />

        <SocialMediaShare
          url={`https://killerwhalecrypto.com${router.asPath}`}
        />

        <Grid item>
          <Description>{description}</Description>
        </Grid>

        <div className={classes.postBody}>
          <Markdown source={postData?.content} coinList={coinList} />
        </div>
        <SocialMediaShare
          url={`https://killerwhalecrypto.com${router.asPath}`}
        />
      </Grid>

      <Grid
        container
        justify="center"
        style={{
          marginTop: '100px',
          marginBottom: '20px',
          marginLeft: '10px',
          marginRight: '10px'
        }}
      >
        <NewsLetterSignup />
      </Grid>
    </Grid>
  )
}

export async function getStaticPaths() {
  const paths = await getAllPostsIds()

  return {
    paths,
    fallback: true
  }
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.slug)
  const { coin } = await fetchAPI('/coin-list')

  return {
    props: {
      postData,
      coinList: coin
    },
    revalidate: 1
  }
}

Article.defaultProps = {
  postData: {}
}
