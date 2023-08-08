import { toast } from 'react-toastify'

export class Notification {
  static user({ content, type }: { content: string; type?: 'success' | 'error' | 'info' }) {
    switch (type) {
      case 'success':
        return toast.success(content, {
          position: 'bottom-center'
        })
      case 'error':
        return toast.error(content, {
          position: 'bottom-center'
        })
      case 'info':
        return toast.info(content, {
          position: 'bottom-center'
        })

      default:
        return toast(content, {
          position: 'bottom-center'
        })
    }
  }
}
