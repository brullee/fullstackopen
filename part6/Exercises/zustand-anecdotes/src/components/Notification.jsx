import { useNotification } from '../store'

const Notification = () => {
  const notification = useNotification()
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }

  return <div style={ notification ? style : null}>{notification}</div>
}

export default Notification