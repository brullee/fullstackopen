import NoteForm from "./componenets/NoteForm"
import NoteList from "./componenets/NoteList"
import VisibilityFilter from "./componenets/VisibilityFilter"

const App = () => (
  <div>
    <NoteForm />
    <VisibilityFilter />
    <NoteList />
  </div>
)

export default App