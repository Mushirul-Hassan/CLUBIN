// 'use client';

// import { useRouter } from 'next/navigation';
// import { Submission } from '@/types';
// import { cn } from '@/lib/utils';
// import { ChevronRight } from 'lucide-react';
// import { statusBadge, idTypeLabel } from '../constants';

// type SubmissionRowProps = {
//   submission: Submission;
//   index: number;
//   isLast: boolean;
// };

// export function SubmissionRow({ submission, index, isLast }: SubmissionRowProps) {
//   const router = useRouter();

//   return (
//     <button
//       onClick={() => router.push(`/submissions/${submission._id}`)}
//       className={cn(
//         'grid grid-cols-[2fr_1fr_1fr_1fr_1fr_40px] gap-4 px-5 py-4 w-full text-left transition-colors hover:bg-[hsl(var(--surface-raised))] group',
//         !isLast && 'border-b border-border/50'
//       )}
//     >
//       <p className="text-sm font-medium text-foreground truncate">
//         {submission.name}
//       </p>

//       <p className="text-sm text-foreground">{submission.age}</p>

//       <p className="text-sm text-muted-foreground">
//         {idTypeLabel[submission.idType] ?? submission.idType}
//       </p>

//       <div>
//         <span
//           className={cn(
//             'text-[11px] font-medium px-2 py-1 rounded-full border',
//             statusBadge[submission.status]
//           )}
//         >
//           {submission.status}
//         </span>
//       </div>

//       <p className="text-sm text-muted-foreground">
//         {new Date(submission.createdAt).toLocaleDateString('en-IN', {
//           day: '2-digit',
//           month: 'short',
//           year: 'numeric',
//         })}
//       </p>

//       <ChevronRight
//         size={16}
//         className="text-muted-foreground group-hover:text-foreground transition-colors"
//       />
//     </button>
//   );
// }