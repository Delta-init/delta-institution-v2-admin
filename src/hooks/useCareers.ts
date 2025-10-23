"use client";
import { useSession } from "next-auth/react";
import { useQueryData } from "./useQueryData";
import { getCareers, getCareerById, createCareer, updateCareer, deleteCareer, getApplicationsByCareerId } from "@/api/careers";
import { useMutationData } from "./useMutation";
import useZodForm from "./useZodForm";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { ICareers } from "@/types/ICareers";
import { careersSchema } from "@/schema/careersSchema";
import { IApplication } from "@/types/IApplication";

export const useCareers = () => {
  const { data: session } = useSession();
  const [careers, setCareers] = useState<ICareers[]>([]);
  const { data, isPending } = useQueryData(["careers"], () =>
    getCareers(session?.user.token)
  );

  useEffect(() => {
    if (data) {
      setCareers((data as any).careers);
    }
  }, [data])
  const response = data as any;
  return { data: response, careers, isPending };
};

export const useCareerById = (id: string) => {
  const { data: session } = useSession();
  const [career, setCareer] = useState<ICareers | null>(null);
  const { data, isPending } = useQueryData(["careerById"], () =>
    getCareerById(session?.user.token, id)
  );
  useEffect(() => {
    if (data) {
      setCareer((data as any).career);
    }
  }, [data])
  return { data, career, isPending };
};

export const useCreateCareer = () => {
  const [requirements, setRequirements] = useState<string[]>([]);
  const [initiaFile, setInitiaFile] = useState<string | null>(null);
  const { data: session } = useSession();
  const router = useRouter();
  const { mutate, isPending } = useMutationData(["createCareer"], (data: any) =>
    createCareer(session?.user.token, data), ['careers'], () => {
      toast.success("Career created successfully")
      router.push("/admin/careers")
    }
  );

  const { form, formState, errors, onFormSubmit, watch, ...rest } = useZodForm(
    careersSchema,
    mutate,
    {
      isActive:true
    }
  );


  return { mutate, isPending, form, formState, errors, onFormSubmit, watch, setRequirements, initiaFile, requirements };
};


export const useUpdateCareer = (id: string) => {
  const [requirements, setRequirements] = useState<string[]>([]);
  const [initiaFile, setInitiaFile] = useState<string | null>(null);
  const { data: session } = useSession();
  const router = useRouter();
  const { data, isPending: isLoading, isFetched } = useQueryData(["careerById"], () =>
    getCareerById(session?.user.token, id)
  );
  const { mutate, isPending, isSuccess } = useMutationData(["updateCareer"], (data: any) =>
    updateCareer(session?.user.token, id, data),
    ['careers'], () => {
      toast.success("Career updated successfully")
      router.push("/admin/careers")
    }
  );

  const { form, formState, errors, onFormSubmit, watch, ...rest } = useZodForm(
    careersSchema,
    mutate,
  );
  useEffect(() => {
    if (data) {
      const career = (data as any).career as ICareers;
      form.reset(
        {
          title: career?.title,
          description: career?.description,
          document: career?.documentLink,
          location: career?.location,
          requirements: career?.requirements,
          salaryRange: career?.salaryRange,
          isActive: career?.isActive,
          position: career?.position,
        }
      )
      setInitiaFile(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${career?.documentLink}`)
      setRequirements(career.requirements)
    }
  }, [isFetched])



  return { mutate, isPending, form, formState, errors, onFormSubmit, watch, setRequirements, initiaFile, requirements };
}


export const useDeleteCareer = (id: string) => {
  const { data: session } = useSession();
  const { mutate, isPending, isSuccess } = useMutationData(["deleteCareer"], (data: any) =>
    deleteCareer(session?.user.token, id)
  );
  return { mutate, isPending, isSuccess };
}


export const useGetApplicationsByCareerId = (id: string) => {
  const { data: session } = useSession();
  const [career, setCareer] = useState<ICareers | null>(null);
  const [applications, setApplications] = useState<IApplication[]>([]);
  const { data, isPending } = useQueryData(["applicationsByCareerId"], () =>
    getApplicationsByCareerId(session?.user.token, id)
  );
  useEffect(() => {
    if (data) {
      setApplications((data as any).applications);
      setCareer((data as any).career);
    }
  }, [data])
  return { data, applications, isPending, career };
}
