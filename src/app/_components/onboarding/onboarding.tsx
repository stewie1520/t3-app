"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StampImg, StudentImg, TeacherImg } from "@/images";
import { cn } from "@/lib/utils";
import { useDocumentTitle } from "@uidotdev/usehooks";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { UniversitiesCombobox } from "../universities-combobox/universities-combobox";
import { LoaderIcon } from "lucide-react";
import { type IUniversity } from "@/app/_models/university.interface";
import { api } from "@/trpc/react";

export const Onboarding = () => {
  const { data: session, update } = useSession()
  const [role, setRole] = useState<"STUDENT" | "TEACHER">()
  const [step, setStep] = useState<"ROLE" | "PROFILE" | "FINISH">("ROLE")
  const [name, setName] = useState<string>(session?.user.name ?? "")
  const [university, setUniversity] = useState<IUniversity>()
  const updateUserAsStudent = api.studentInfo.updateUserAsStudent.useMutation()

  const params = useSearchParams()
  const router = useRouter()

  useDocumentTitle("Welcome Onboard")

  useEffect(() => {
    const role = params.get("role")
    if (role === "STUDENT") {
      setRole("STUDENT")
      setStep("PROFILE")
      return
    }

    if (!role) {
      setStep("ROLE")
    }
  }, [params])

  useEffect(() => {
    setName(session?.user.name ?? "")
  }, [session])

  const handleChangeUniversity = useCallback((university: IUniversity) => {
    setUniversity(university)
  }, [])

  const isStepFinishEnabled = useMemo(() => {
    if (step !== "PROFILE") return false

    if (!name) return false
    if (!university) return false

    return true
  }, [name, step, university])

  const handleStepFinish = useCallback(async () => {
    setStep("FINISH")

    if (!university) return

    await updateUserAsStudent.mutateAsync({
      universityId: university?.id,
      name,
    })

    await update()

    router.push("/dashboard/listen-now")
  }, [name, router, university, update, updateUserAsStudent])

  return (    
    <Card className="w-full max-w-[400px]">
      {step === "ROLE" && (
        <>
        <CardHeader>
          <CardTitle>Pick a Role</CardTitle>
          <CardDescription>Let&apos;s begin a great journey.</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-row gap-2 w-full">
            <div 
              className={cn("relative border rounded flex flex-col flex-1 items-center justify-center py-6 gap-2 cursor-pointer", role === "STUDENT" && "bg-blue-200 border-blue-300", role !== "STUDENT" && "hover:bg-gray-100")}
              onClick={() => setRole("STUDENT")}
            >
              <Image src={StudentImg} alt="student" width={48} height={48}/>
              <span className="font-bold">Student</span>
            </div>
            <div 
              className={cn("relative border rounded flex flex-col flex-1 items-center justify-center py-6 gap-2 cursor-pointer", role === "TEACHER" && "bg-blue-200 border-blue-300", role !== "TEACHER" && "hover:bg-gray-100" )}
              onClick={() => setRole("TEACHER")}
            >
              <Image src={TeacherImg} alt="teacher" width={48} height={48}/>
              <span className="font-bold">Teacher</span>
            </div>
          </div>
        </CardContent>

        <CardFooter>
          <div className="w-full">
            <Button className="w-full" disabled={!role} onClick={() => {
              router.push('?role=' + role)
            }}>Continue</Button>
          </div>
        </CardFooter>
        </>
      )}


      {step === "PROFILE" && role === "STUDENT" && (
        <>
          <CardHeader>
            <CardTitle>
              Information
            </CardTitle>
            <CardDescription>Let&apos;s tell us a bit about you.</CardDescription>
          </CardHeader>

          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Your Name</Label>
                  <Input id="name" placeholder="E.g Jane Doe" defaultValue={name} onChange={(e) => setName(e.target.value)}/>
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="university">Your School</Label>
                  <UniversitiesCombobox onChange={handleChangeUniversity}/>
                </div>
              </div>
            </form>
          </CardContent>

          <CardFooter className="flex justify-between space-x-2">
            <Button variant="outline" onClick={() => router.replace("?")}>Back</Button>
            <Button className="w-full" disabled={!isStepFinishEnabled} onClick={handleStepFinish}>Continue</Button>
          </CardFooter>
        </>
      )}

      {step === "FINISH" && (
        <CardContent>
          <div className="flex flex-col items-center justify-center py-2">
            <Image src={StampImg} draggable={false} alt="stamp" width={200} height={200}/>

            <span className="text-2xl font-bold">Thank you!</span>
            <span className="text-gray-500 text-sm items-center flex gap-1"><LoaderIcon className="animate-spin"/> You will be redirected to class soon</span>
          </div>
        </CardContent>
      )}
    </Card>
  )
}