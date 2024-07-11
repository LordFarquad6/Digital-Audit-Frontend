import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

type Set<T> = (fn: (state: T) => Partial<T>) => void

export enum Role {
  ADMIN = 'ADMIN',
  COMPANY = 'COMPANY',
  STUDENT = 'STUDENT',
}

export type TStateAuthStore = {
  accessToken: string | undefined
  id: string | undefined
  email: string | undefined
  roles: string[] | undefined
}

export type TActionsAuthStore = {
  login: (
    _accessToken: string,
    _id: string,
    _email: string,
    _roles: string[],
  ) => void
  logout: () => void
  refreshToken: (_accessToken: string) => void
  setAuthState: (state: TStateAuthStore) => void
  reset: () => void
}

export type IAuthStore = TStateAuthStore & TActionsAuthStore

const initialState: TStateAuthStore = {
  accessToken: undefined,
  id: undefined,
  email: undefined,
  roles: [] as string[],
}

const authStore = (set: Set<IAuthStore>): IAuthStore => ({
  ...initialState,

  login: (accessToken: string, id: string, email: string, roles: string[]) => {
    set(() => ({
      accessToken,
      id,
      email,
      roles,
    }))
  },
  logout: () => {
    set(() => ({
      accessToken: undefined,
      id: undefined,
      email: undefined,
      roles: [],
    }))
  },
  refreshToken: (accessToken: string) => set(() => ({ accessToken })),
  setAuthState: (state: TStateAuthStore) => set(() => state),
  reset: () => set(() => initialState),
})

export const useAuthStore = create(
  persist(devtools(authStore), { name: 'panel-auth' }),
)
