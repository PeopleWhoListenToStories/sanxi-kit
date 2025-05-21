'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLogin } from '~/services/auth';
import { useTranslations } from 'next-intl';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import { Label } from '~/components/ui/label';
import { Checkbox } from '~/components/ui/checkbox';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Github } from 'lucide-react';
import { signIn } from 'next-auth/react';

const loginFormSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1)
});

type LoginFormInput = z.infer<typeof loginFormSchema>;

export type LoginFormErrors = z.typeToFlattenedError<LoginFormInput>;

export type LoginFormResult =
  | {
    success: true;
  }
  | {
    success: false;
    errors: LoginFormErrors;
  };

export function LoginForm() {
  const t = useTranslations('login');
  const router = useRouter();
  const [loginType, setLoginType] = useState('github');
  const [error, setError] = useState<string>();
  const [emailSent, setEmailSent] = useState(false);

  const form = useForm<LoginFormInput>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: '',
      password: ''
    }
  });

  const { mutate: loginMutate, isPending: isLoading } = useLogin();

  const onSubmit = async (data: LoginFormInput) => {
    setError(undefined);
    try {
      await loginMutate({
        phone: data.username,
        password: data.password
      }, {
        onSuccess: () => {
          router.push('/');
        },
        onError: (error) => {
          console.error('Login error:', error);
          setError(t('loginError'));
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      setError(t('loginError'));
    }
  };

  return (
    <Card className="w-[420px] shadow-2xl dark:shadow-slate-700/50 bg-background/80 dark:bg-background/80 backdrop-blur-sm supports-[backdrop-filter]:bg-background/50 dark:supports-[backdrop-filter]:bg-background/50 transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
      <CardHeader className="space-y-2 p-8">
        <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">{t('title')}</CardTitle>
        <CardDescription className="text-center text-muted-foreground text-base">{t('description')}</CardDescription>
      </CardHeader>
      <CardContent className="p-8 pt-0">
        <Tabs value={loginType} onValueChange={setLoginType} className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 gap-1 mb-8 p-1 bg-muted/20 rounded-lg">
            <TabsTrigger value="github" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200 rounded-md text-xs sm:text-base py-2 px-2 sm:px-4 flex items-center justify-center whitespace-nowrap">
              <Github className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
              GitHub
            </TabsTrigger>
            <TabsTrigger value="password" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200 rounded-md text-xs sm:text-base py-2 px-2 sm:px-4 whitespace-nowrap">{t('passwordLogin')}</TabsTrigger>
            <TabsTrigger value="email" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200 rounded-md text-xs sm:text-base py-2 px-2 sm:px-4 whitespace-nowrap">{t('emailLogin')}</TabsTrigger>
            <TabsTrigger value="qrcode" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200 rounded-md text-xs sm:text-base py-2 px-2 sm:px-4 whitespace-nowrap">{t('qrCode')}</TabsTrigger>
          </TabsList>
          <TabsContent value="github" className="py-6">
            <div className="space-y-4">
              <Button
                className="w-full h-11 text-base font-medium bg-[#24292e] hover:bg-[#24292e]/90 text-white flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                onClick={() => signIn('github', { callbackUrl: '/' })}
              >
                <Github className="w-5 h-5" />
                {t('loginWithGithub')}
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="password">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground/90">{t('username')}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t('usernamePlaceholder')}
                          className="h-11"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground/90">{t('password')}</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder={t('passwordPlaceholder')}
                          className="h-11"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember" className="text-sm text-muted-foreground">{t('rememberMe')}</Label>
                  </div>
                  <Button variant="link" className="px-0 text-sm font-medium text-primary hover:text-primary/90">
                    {t('forgotPassword')}
                  </Button>
                </div>
                {error && (
                  <div className="text-sm text-destructive text-center">{error}</div>
                )}
                <Button
                  type="submit"
                  className="w-full h-11 text-base font-medium transition-all hover:scale-[1.02] bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={isLoading}
                >
                  {isLoading ? t('loggingIn') : t('loginButton')}
                </Button>
              </form>
            </Form>
          </TabsContent>
          <TabsContent value="qrcode">
            <div className="flex flex-col items-center justify-center p-6 space-y-4">
              <div className="w-48 h-48 bg-muted/20 rounded-lg flex items-center justify-center border border-border transition-all duration-300 hover:border-primary/50">
                {/* TODO: Implement QR code */}
                <span className="text-muted-foreground">QR Code Placeholder</span>
              </div>
              <p className="text-sm text-muted-foreground">{t('scanQrCode')}</p>
            </div>
          </TabsContent>
          <TabsContent value="email" className="py-6">
            <div className="space-y-6">
              {!emailSent ? (
                <>
                  <div className="space-y-3">
                    <Label className="text-foreground/90">{t('email')}</Label>
                    <Input
                      type="email"
                      placeholder={t('emailPlaceholder')}
                      className="h-11 transition-all duration-200 focus:scale-[1.02]"
                    />
                  </div>
                  <Button
                    className="w-full h-11 text-base font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 hover:scale-[1.02]"
                    onClick={() => setEmailSent(true)}
                  >
                    {t('sendLoginLink')}
                  </Button>
                </>
              ) : (
                <div className="text-center space-y-4">
                  <div className="text-sm text-muted-foreground">
                    {t('emailLinkSent')}
                  </div>
                  <Button
                    variant="outline"
                    className="w-full h-11 text-base font-medium hover:bg-muted/50 transition-all duration-200 hover:scale-[1.02]"
                    onClick={() => setEmailSent(false)}
                  >
                    {t('tryAnotherEmail')}
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      {loginType === 'password' && (
        <CardFooter className="flex justify-center pb-6">
          <Button variant="link" className="text-base text-muted-foreground hover:text-primary">
            {t('register')}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}