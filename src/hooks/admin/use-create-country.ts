// import axios from 'axios';
import { z } from 'zod';
// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import toast from 'react-hot-toast';
// import { useRouter } from 'next/navigation';

export const formSchema = z.object({
  country: z.string().min(1, {
    message: 'Country emoji is required',
  }),
  name: z.string().min(1, {
    message: 'Country name is required',
  }),
  description: z.string().min(10, {
    message: 'Country description is required',
  }),
  title: z
    .string()
    .min(1, {
      message: 'Country title is required',
    })
    .optional(),
});

// export const createCourse = async (courseData: z.infer<typeof formSchema>) => {
//   const response = await axios.post('/api/courses', courseData);
//   return response.data;
// };

// export const useCreateCourse = () => {
//   const queryClient = useQueryClient();
//   const router = useRouter();

//   return useMutation({
//     mutationFn: createCourse,
//     async onSuccess(data) {
//       await queryClient.invalidateQueries({ queryKey: ['courses'] });
//       router.push(`/teacher/courses/${data.id}`);
//       toast.success('Course created successfully');
//     },
//     async onError() {
//       toast.error('Something went wrong');
//     },
//   });
// };
