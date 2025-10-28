"use client";
import { useSession } from "next-auth/react";
import { useQueryData } from "./useQueryData";
import { getTeam, getTeamById, createTeam, updateTeam, deleteTeam } from "@/api/team";
import { useMutationData } from "./useMutation";
import useZodForm from "./useZodForm";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { ITeam } from "@/types/ITeam";
import { teamSchema } from "@/schema/teamSchema";

export const useTeam = () => {
  const { data: session } = useSession();
  const [team, setTeam] = useState<ITeam[]>([]);
  const { data, isPending } = useQueryData(["team"], () =>
    getTeam(session?.user.token)
  );

  useEffect(() => {
    if (data) {
      setTeam((data as any).team);
    }
  }, [data])
  const response = data as any;
  return { data: response, team, isPending };
};

export const useCareerById = (id: string) => {
  const { data: session } = useSession();
  const [team, setTeam] = useState<ITeam | null>(null);
  const { data, isPending } = useQueryData(["teamById"], () =>
    getTeamById(session?.user.token, id)
  );
  useEffect(() => {
    if (data) {
      setTeam((data as any).team);
    }
  }, [data])
  return { data, team, isPending };
};

export const useCreateTeam = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [requirements, setRequirements] = useState<string[]>([]);
  const [team, setTeam] = useState<ITeam[]>([]);
  const [initiaFile, setInitiaFile] = useState<string | null>(null);
  const { data: session } = useSession();
  const { data: teamData } = useQueryData(["team"], () =>
    getTeam(session?.user.token)
  );

  useEffect(() => {
    if (teamData) {
      console.log("teamData 🔴")
      setTeam((teamData as any).team);
      
    }
  }, [teamData])

  const router = useRouter();
  const { mutate, isPending } = useMutationData(["createTeam"], (data: any) =>
    createTeam(session?.user.token, data), ['team'], () => {
      toast.success("Team created successfully")
      router.push("/admin/team")
    }
  );

  const { form, formState, errors, onFormSubmit, watch, ...rest } = useZodForm(
    teamSchema,
    mutate,
    {
      showingPosition: 1,
      isActive: true,
      image: null,
    }
  );


  return { mutate, isPending, form, formState, errors, onFormSubmit, watch, setRequirements, initiaFile, requirements,isLoading };
};


export const useUpdateTeam = (id: string) => {
  const [requirements, setRequirements] = useState<string[]>([]);
  const [initiaFile, setInitiaFile] = useState<string | null>(null);
  const { data: session } = useSession();
  const router = useRouter();
  const { data, isPending: isLoading, isFetched } = useQueryData(["careerById",id], () =>
    getTeamById(session?.user.token, id)
  );

  const { mutate, isPending, isSuccess } = useMutationData(["updateTeam"], (data: any) =>
    updateTeam(session?.user.token, id, data),
    ['team'], () => {
      toast.success("Team updated successfully")
      router.push("/admin/team")
    }
  );

  const { form, formState, errors, onFormSubmit, watch, ...rest } = useZodForm(
    teamSchema,
    mutate,
  );
  useEffect(() => {
    if (data) {
      const team = (data as any).team as ITeam;
      form.reset(
        {
          name: team?.name,
          position: team?.position,
          image: team?.image,
          showingPosition: team?.showingPosition,
          isActive: team?.isActive,
        }
      )
      setInitiaFile(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${team?.image}`)
    }
  }, [isFetched])



  return { mutate, isPending, form, formState, errors, onFormSubmit, watch, setRequirements, initiaFile, requirements,isLoading };
}


export const useDeleteTeam = (id: string) => {
  const { data: session } = useSession();
  const { mutate, isPending, isSuccess } = useMutationData(["deleteTeam"], (data: any) =>
    deleteTeam(session?.user.token, id)
  );
  return { mutate, isPending, isSuccess };
}



