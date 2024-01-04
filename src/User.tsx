import React, { useId, useMemo } from 'react'
import { useEffect, useState } from 'react'

interface UserType {
    id?: number
    name?: string
}

export function User() {
    const id1 = useId()
    const id = useId()

    const [users, setUsers] = useState<UserType[]>([
        { id: 1, name: 'Kyle' },
        { id: 2, name: 'Jonm' },
    ])
    const [selectedUserId, setSelectedUserId] = useState<number | undefined>()

    const selectedUser = useMemo(() => {
        return users.find((user) => user.id === selectedUserId)
    }, [selectedUserId])

    useEffect(() => {
        selectUser(1)
        updateUser(1, 'Kaly改过的名字')
    }, [])

    function selectUser(id: number) {
        setSelectedUserId((prevId) => {
            return id
        })
    }

    function updateUser(id: number, name: string) {
        setUsers((prevUsers) => {
            const newUsers: UserType[] = [...prevUsers]
            const user = newUsers.find((user) => user.id === id)
            user!.name = name
            return newUsers
        })
    }

    return (
        <>
            <div>1: {JSON.stringify(selectedUser)}</div>
            <div>2: {JSON.stringify(users)}</div>
            <div>
                <label htmlFor={`${id1}-email`}>Email</label>
                <input id={`${id1}-email`} />
            </div>
            <div>
            <label htmlFor={`${id}-password`}>Password</label>
            <input id={`${id}-password`} />
            </div>
        </>
    )
}
