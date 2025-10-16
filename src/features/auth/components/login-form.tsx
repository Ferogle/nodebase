"use client";

import { cn } from "@/lib/utils";
import { zodResolver } from '@hookform/resolvers/zod';
import Image from "next/image";
import Link from "next/link";
import {useRouter} from 'next/navigation';
import {useForm} from 'react-hook-form';
import {toast} from "sonner";
import {z} from 'zod';
import {Button, buttonVariants} from "@/components/ui/button"
import {Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Form, FormControl, FormField, FormItem, FormDescription, FormLabel, FormMessage} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import { signIn } from "@/lib/auth-client";

// import {authClient} from "@/lib/auth";

const loginSchema = z.object({
    email: z.email("Please enter a valid email address"),
    password: z.string().min(1, "Password is required").min(6, "Password must be at least 8 characters").max(32, "Password must be at most 32 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
    const router = useRouter();
    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const onSubmit = async (data: LoginFormValues) => {
        try {
            // await authClient.signInWithPassword(data);
            await signIn.email(
                {
                    email: data.email,
                    password: data.password,
                    callbackURL: "/"
                },
                {
                    onSuccess: () => {
                        router.push("/");
                    },
                    onError: (ctx) => {
                        toast.error(ctx.error.message)
                    }
                }
            );
        }
        catch (error) {
            toast.error("Failed to log in. Please try again.");
            console.log(error);
        }
    };
    const isPending = form.formState.isSubmitting;
    return (
        <div className="flex flex-col gap-6">
            <Card>
                <CardHeader className="text-center">
                    <CardTitle>
                        Welcome Back!
                    </CardTitle>
                    <CardDescription>
                        Login to continue
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="grid gap-6">
                                <div className="flex flex-col gap-4">
                                    <Button variant="outline" disabled={isPending} className={cn(buttonVariants({variant: "outline"}), "w-full")}>
                                        Continue with Google
                                    </Button>
                                    <Button variant="outline" disabled={isPending} className={cn(buttonVariants({variant: "outline"}), "w-full")}>
                                        Continue with Github
                                    </Button>
                                </div>
                                <div className="grid gap-6">
                                    <FormField control={form.control} name="email" render={({field}) => (
                                        <FormItem>
                                            <FormLabel> Email </FormLabel>
                                            <FormControl>
                                                <Input type="email" placeholder="username@example.com" {...field}/>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                    />
                                    <FormField control={form.control} name="password" render={({field}) => (
                                        <FormItem>
                                            <FormLabel> Password </FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="********" {...field}/>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                    />
                                    <Button type="submit" className="w-full" disabled={isPending}>
                                        Login
                                    </Button>
                                </div>
                                <div className="text-center text-sm">
                                    Don't have an account?{" "}
                                    <Link href="/signup" className="underline underline-offset-4"> Sign up </Link>
                                </div>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
