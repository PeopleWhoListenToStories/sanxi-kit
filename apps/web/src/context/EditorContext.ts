import { createContext } from 'react'

interface IEditorContext {
  isAiLoading: boolean
  aiError?: string | null
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  setIsAiLoading: Function
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  setAiError: Function
}

export const EditorContext = createContext<IEditorContext>({
  isAiLoading: false,
  aiError: null,
  setIsAiLoading: () => {},
  setAiError: () => {},
})