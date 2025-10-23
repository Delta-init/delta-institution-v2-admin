"use client";
import { useSession } from "next-auth/react";
import { useQueryData } from "./useQueryData";
import { getBlogs, getBlogById, createBlog, updateBlog } from "@/api/blog";
import { useMutationData } from "./useMutation";
import { blogPostSchema } from "@/schema/blogSchema";
import useZodForm from "./useZodForm";
import { useRouter } from "next/navigation";
import { $generateHtmlFromNodes } from '@lexical/html'
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getRoot } from "lexical";
import { $generateNodesFromDOM } from '@lexical/html';
import { IBlog } from "@/types/IBlogPost";

export const useBlogs = () => {
  const { data: session } = useSession();
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const { data, isPending } = useQueryData(["blogs"], () =>
    getBlogs(session?.user.token)
  );

  useEffect(() => {
    if (data) {
      setBlogs((data as any).blogs);
    }
  }, [data])
  const response = data as any;
  return { data: response,blogs, isPending };
};

export const useBlogById = (id: string) => {
  const { data: session } = useSession();
  const [blog, setBlog] = useState<IBlog | null>(null);
  const { data, isPending } = useQueryData(["blogById"], () =>
    getBlogById(session?.user.token, id)
  );
  useEffect(() => {
    if (data) {
      setBlog((data as any).blog);
    }
  }, [data])
  return {data, blog, isPending };
};

export const useCreateBlog = () => {
  const [initiaImage, setInitiaImage] = useState<string | null>(null);  
  const [tags, setTags] = useState<string[]>([]);
  const { data: session } = useSession();
  const [content, setContent] = useState<any>(null);
  const router = useRouter();
  const [editor] = useLexicalComposerContext()
  const { mutate, isPending } = useMutationData(["createBlog"], (data: any) =>
    createBlog(session?.user.token, data)
  );

  const { form, formState, errors, onFormSubmit, watch, ...rest } = useZodForm(
    blogPostSchema,
    mutate,
    {
      category:"general"
    }
  );


  useEffect(() => {
    const updatePreview = () => {
      editor.update(() => {
        const htmlString = $generateHtmlFromNodes(editor, null)
        form.setValue("content", htmlString)
      })
    }

    updatePreview()

    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const htmlString = $generateHtmlFromNodes(editor, null)
        form.setValue("content", htmlString)
      })
    })
  }, [editor])
  // const image = watch("image");


  return { mutate,tags,setTags, isPending, content, form, formState, errors, onFormSubmit, watch, setContent,initiaImage };
};


export const useUpdateBlog = (id: string) => {
  const [initiaImage, setInitiaImage] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const { data: session } = useSession();
  const router = useRouter();
  const [content, setContent] = useState<any>(null);
  const { data, isPending: isLoading, isFetched } = useQueryData(["blogById"], () =>
    getBlogById(session?.user.token, id)
  );
  const [editor] = useLexicalComposerContext()
  const { mutate, isPending, isSuccess } = useMutationData(["updateBlog"], (data: any) =>
    updateBlog(session?.user.token, id, data)
  );

  const { form, formState, errors, onFormSubmit, watch, ...rest } = useZodForm(
    blogPostSchema,
    mutate
  );
  useEffect(() => {
    if (data) {
      const blog = (data as any).blog as IBlog;
      form.reset(
        {
          title: blog.title,
          description: blog.description,
          image: blog.image,
          tags: blog.tags,
          category: blog.category,

        }
      )
      setInitiaImage(blog.image)
      setTags(blog.tags)
      //  the content is html so i want to pass lexical and convert to tree
      const htmlString = blog.content;

      editor.update(() => {
        const parser = new DOMParser();
        const dom = parser.parseFromString(htmlString, 'text/html');
        const nodes = $generateNodesFromDOM(editor, dom);
        console.log(nodes)
        const root = $getRoot();
        root.clear();
        root.append(...nodes);
      });
    }
  }, [isFetched])

  useEffect(() => {
    if (isSuccess) {
      toast.success("Blog updated successfully")
      router.push("/admin/blogs")
    }
  }, [isSuccess])




  useEffect(() => {
    const updatePreview = () => {
      editor.update(() => {
        const htmlString = $generateHtmlFromNodes(editor, null)
        form.setValue("content", htmlString)
      })
    }

    updatePreview()

    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const htmlString = $generateHtmlFromNodes(editor, null)
        form.setValue("content", htmlString)
      })
    })
  }, [editor])
  // const image = watch("image");


    return { mutate,tags,setTags, isPending, content, form, formState, errors, onFormSubmit, watch, setContent,initiaImage };
}




