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
import { signUp } from "@/lib/auth-client";

// import {authClient} from "@/lib/auth";

const registerSchema = z.object({
    email: z.email("Please enter a valid email address"),
    password: z.string().min(1, "Password is required").min(6, "Password must be at least 8 characters").max(32, "Password must be at most 32 characters"),
    confirmPassword: z.string()

})
.refine(z => z.password == z.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
})

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
    const router = useRouter();
    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: ""
        },
    });
    const onSubmit = async (data: RegisterFormValues) => {
        try {
            // await authClient.signInWithPassword(data);
            await signUp.email(
                {
                    name: data.email,
                    email: data.email,
                    password: data.password,
                    callbackURL: "/"
                },
                {
                    onSuccess:() => {
                        router.push("/")
                    },
                    onError: (ctx) => {
                        toast.error(ctx.error.message);
                    }
                }
            )
            toast.success("Logged in successfully!");
            router.push("/");
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
                        Let's get started!
                    </CardTitle>
                    <CardDescription>
                        Create your account to get started
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
                                    <FormField control={form.control} name="confirmPassword" render={({field}) => (
                                        <FormItem>
                                            <FormLabel> Confirm Password </FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="********" {...field}/>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                    />
                                    <Button type="submit" className="w-full" disabled={isPending}>
                                        Sign Up
                                    </Button>
                                </div>
                                <div className="text-center text-sm">
                                    Already have an account?{" "}
                                    <Link href="/login" className="underline underline-offset-4"> Login </Link>
                                </div>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
