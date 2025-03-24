import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type BearState = {
  token: string;
  setUserToken: (token: string) => void;
  updateUserToken: (token: string) => void;
  user: IUser | null;
  setUser: (user: IUser | null | undefined) => void;
  updateUser: (user: Partial<IUser>) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  selectedOrganization: unknown;
  organizationList: [];
  setOrganizationList: (organizationList: []) => void;
  setSelectedOrganization: (selectedOrganization: null) => void;
  wikiList: [];
  setWikiList: (wikiList: []) => void;
  selectedWiki: null;
};

export const useUserStore = create<BearState>()(
  persist(
    (set, get) => ({
      token: '',
      setUserToken: token => set({ token }),
      updateUserToken: token => set({ token: token || '' }),
      user: null,
      setUser: (user) => {
        if (user) {
          set({ user });
          return;
        }
        set({ user: null });
      },
      // 更新user中的部分字段
      updateUser: (user) => {
        const oldUser = get().user;
        if (!oldUser) {
          return;
        }
        const newUser = { ...oldUser, ...user };
        set({ user: newUser });
      },
      loading: true,
      setLoading: loading => set({ loading }),
      organizationList: [],
      setOrganizationList: organizationList => set({ organizationList: organizationList || [] }),
      selectedOrganization: null,
      setSelectedOrganization: selectedOrganization => set({ selectedOrganization: selectedOrganization || null }),
      wikiList: [],
      setWikiList: wikiList => set({ wikiList: wikiList || [] }),
      selectedWiki: null,
    }),
    {
      name: 'user-store',
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({
        token: state.token,
        user: state.user,
        loading: state.loading,
        selectedOrganization: state.selectedOrganization,
        organizationList: state.organizationList,
        wikiList: state.wikiList,
        selectedWiki: state.selectedWiki,
      }), // 持久化状态
    },
  ),
);
