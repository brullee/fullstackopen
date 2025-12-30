const dummy = (blogs) => {
  blogs
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, item) => sum + item.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((max, blog) => max.likes < blog.likes ? blog : max)
}

const mostBlogs = (blogs) => {

  const authorList = []

  blogs.forEach((blog) => {
    const author = authorList.find(a => a.author === blog.author)
    const index = authorList.findIndex(a => a.author === blog.author)

    if (author){
      authorList[index].blogs += 1
    }
    else{
      authorList.push( { author: blog.author, blogs: 1 } )
    }
  })

  return authorList.reduce((most, author) => most.blogs < author.blogs ? author : most)
}

const mostLikes = (blogs) => {

  const authorList = []

  blogs.forEach((blog) => {
    const author = authorList.find(a => a.author === blog.author)
    const index = authorList.findIndex(a => a.author === blog.author)
    if (author){
      authorList[index].likes += blog.likes
    }
    else{
      authorList.push( { author: blog.author, likes: blog.likes } )
    }
  })
  return authorList.reduce((most, author) => most.likes < author.likes ? author : most)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
