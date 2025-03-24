import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { useAuthStore } from "~/stores/authStore"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel } from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const userFormSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1, "请输入用户名"),
  avatar: z.string().url().optional()
})

type UserFormInput = z.infer<typeof userFormSchema>

export const UserOrSetting = () => {
  const { user } = useAuthStore()

  const form = useForm<UserFormInput>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      email: user?.email,
      name: user?.name,
      avatar: user?.avatar
    }
  })

  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-accent cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
            <Avatar className="w-[32px] h-[32px]">
              <AvatarImage src={user?.avatar || process.env.NEXT_PUBLIC_AVATAR_URL} />
              <AvatarFallback></AvatarFallback>
            </Avatar>
          </div>
          <span>用户/设置</span>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>修改用户信息</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>邮箱</FormLabel>
                  <FormControl>
                    <Input {...field} disabled />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>用户名</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>头像URL</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}