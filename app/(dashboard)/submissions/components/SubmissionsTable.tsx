// 'use client';

// import { Submission, SubmissionStatus } from '@/types';
// import { Loader2 } from 'lucide-react';
// import { SubmissionRow } from './SubmissionRow';

// type SubmissionsTableProps = {
//   submissions: Submission[];
//   loading: boolean;
//   activeTab: SubmissionStatus;
// };

// export function SubmissionsTable({
//   submissions,
//   loading,
//   activeTab,
// }: SubmissionsTableProps) {
//   return (
//     <div className="bg-[hsl(var(--surface))] border border-border rounded-xl overflow-hidden">
      
//       {/* Header */}
//       <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_40px] gap-4 px-5 py-3 border-b border-border">
//         {['Name', 'Age', 'ID Type', 'Status', 'Submitted', ''].map((h) => (
//           <p
//             key={h}
//             className="text-[11px] uppercase tracking-widest text-muted-foreground font-medium"
//           >
//             {h}
//           </p>
//         ))}
//       </div>

//       {/* Content */}
//       {loading ? (
//         <div className="flex items-center justify-center py-16">
//           <Loader2 size={20} className="animate-spin text-muted-foreground" />
//         </div>
//       ) : submissions.length === 0 ? (
//         <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
//           <p className="text-sm">
//             No {activeTab.toLowerCase()} submissions
//           </p>
//         </div>
//       ) : (
//         submissions.map((sub, i) => (
//           <SubmissionRow
//             key={sub._id}
//             submission={sub}
//             index={i}
//             isLast={i === submissions.length - 1}
//           />
//         ))
//       )}
//     </div>
//   );
// }



