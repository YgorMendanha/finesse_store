'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { AiOutlineUser } from 'react-icons/ai'
import { EditForm } from './partials/edit'
import { LoginForm } from './partials/login'
import { RegisterForm } from './partials/register'
import { useUser } from '@/hooks/useUser'

export function UserModalComponent() {
  const { user } = useUser()
  const [open, setOpen] = useState<boolean>(false)
  const [editUser, setEditUser] = useState<boolean>(false)
  const [createAccount, setCreateAccount] = useState<boolean>(false)

  useEffect(() => {
    function handleResize(e: any) {
      var container = document.getElementById('modal')
      if (!container?.contains(e.target)) {
        setOpen(false)
      }
    }
    window.addEventListener('mouseup', handleResize)
    return () => {
      window.removeEventListener('mouseup', handleResize)
    }
  }, [])

  const changeForm = useCallback(() => {
    setCreateAccount((state) => !state)
  }, [])

  const closeModal = useCallback(() => {
    setOpen(false)
  }, [])

  useEffect(() => {
    if (!open) {
      setCreateAccount(false)
    }
  }, [open])

  useEffect(() => {
    if (user?.id) {
      setOpen(false)
      setEditUser(true)
    } else {
      setEditUser(false)
    }
  }, [user])

  return (
    <>
      <AiOutlineUser className="mx-4 cursor-pointer" onClick={() => setOpen(true)} />

      {open && (
        <div className="absolute z-50 h-screen w-[100%] bg-[#0000004d] top-0 left-0 flex m-auto">
          {editUser ? (
            <EditForm closeModal={closeModal} />
          ) : (
            <>
              {!createAccount ? (
                <LoginForm changeForm={changeForm} closeModal={closeModal} />
              ) : (
                <RegisterForm changeForm={changeForm} closeModal={closeModal} />
              )}
            </>
          )}
        </div>
      )}
    </>
  )
}
