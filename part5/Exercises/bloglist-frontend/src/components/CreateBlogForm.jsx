const CreateBlogForm = (props) => {
  return(
    <form onSubmit={props.addBlog}>
      <div>
        <h2>Create New Blog:</h2>
        <label>
          title:
          <input
            type="text"
            value={props.title}
            onChange={({ target }) => props.setTitle(target.value)}
          />
        </label>
        <br/>
        <label>
          author:
          <input
            type="text"
            value={props.author}
            onChange={({ target }) => props.setAuthor(target.value)}
          />
        </label>
        <br/>
        <label>
          url:
          <input
            type="text"
            value={props.url}
            onChange={({ target }) => props.setUrl(target.value)}
          />
        </label>
        <br/>
        <button type="submit">Create</button>
      </div>
    </form>
  )}

export default CreateBlogForm