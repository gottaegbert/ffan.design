TODO:
@gottaegbert use react-spinners for preloading

1.Change mouse effect [link](https://www.youtube.com/watch?v=kySGqoU7X-s&ab_channel=Hyperplexed)
2.Improve stability 
3.Hacked text generation [link](https://codepen.io/gottaegbert/pen/oNaKEdg)

## 🚀 Portfolio

Live at 👉 [egbert.vercel.app](https://egbert.vercel.app)

## ✨ Stack

- Next.js
- Typescript
- Scss
- GSAP
- Netlify CMS

## 学习

### ISR

Next.js 推出的 ISR(Incremental Static Regeneration) 方案，允许在应用运行时再重新生成每个页面 HTML，而不需要重新构建整个应用。这样即使有海量页面，也能使用上 SSG 的特性。一般来说，使用 ISR 需要 getStaticPaths 和 getStaticProps 同时配合使用。举个例子：

```javascript
// pages/posts/[id].js
function Post(props) {
	const { postData } = props;
  
  return <div>{postData.title}</div>
}

export async function getStaticPaths() {
  const paths = await fetch('https://.../posts');
  return {
    paths,
    // 页面请求的降级策略，这里是指不降级，等待页面生成后再返回，类似于 SSR
    fallback: 'blocking'
  }
}

export async function getStaticProps({ params }) {
  // 使用 params.id 获取对应的静态数据
  const postData = await getPostData(params.id)
  return {
    props: {
      postData
    },
    // 开启 ISR，最多每10s重新生成一次页面
    revalidate: 10,
  }
}
```

### Fouc

A flash of unstyled content (or flash of unstyled text, FOUC) is an instance where a web page appears briefly with the browser's default styles prior to loading an external CSS stylesheet, due to the web browser engine rendering the page before all ...
