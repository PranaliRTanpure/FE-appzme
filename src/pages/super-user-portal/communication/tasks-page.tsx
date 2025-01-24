import TasksList from "@/components/super-user/tasks/tasks-list";
import { Grid } from "@mui/system";

const TasksPage = () => {
  return (
    <Grid width={"100%"}>
      <TasksList />
    </Grid>
  );
};

export default TasksPage;
