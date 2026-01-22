import { ChevronLeftIcon } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Title from "../components/Title";

function TaskPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const title = searchParams.get("title");
  const description = searchParams.get("description");

  return (
    <div className="min-h-screen w-full bg-slate-500 p-4 sm:p-6">
      <div className="max-w-md mx-auto w-full sm:w-[500px] space-y-4">
        <div className="flex justify-center relative mb-6">
          <button
            onClick={() => navigate(-1)}
            className="absolute left-0 top-0 bottom-0 text-slate-100"
          >
            <ChevronLeftIcon />
          </button>
          <Title>Detalhes da Tarefas</Title>
        </div>

        <div className="bg-slate-200 p-4 sm:p-6 rounded-md">
          <h2 className="text-lg sm:text-xl font-bold text-slate-600 break-words">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 break-words">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default TaskPage;
