import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import { Button, Typography } from "@mui/material";
import { Grid } from "@mui/system";
import { format, parseISO } from "date-fns";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CustomTextArea from "../../../../../common-components/custom-text-area/custom-textarea";
import useApiFeedback from "../../../../../hooks/useApiFeedback";
import { setIsLoading } from "../../../../../redux/actions/loader-action";
import { usePatientVitalControllerServiceUpdatePatientVital } from "../../../../../sdk/queries";
import { PatientVital } from "../../../../../sdk/requests";
import { GetTenantId } from "../../../../../services/common/get-tenant-id";

type VitalNotesFormType = {
  vitalType: string;
  vitalNote: PatientVital;
  action: string;
  onClose: () => void;
  refetch: () => void;
};

const VitalNoteForm = (props: VitalNotesFormType) => {
  const { onClose, vitalType, vitalNote, action, refetch } = props;
  vitalType;
  const [note, setNote] = useState(vitalNote?.note?.name || "");

  const dispatch = useDispatch();

  const { isPending, data, mutateAsync, isSuccess, isError, error } =
    usePatientVitalControllerServiceUpdatePatientVital();

  useEffect(() => {
    dispatch(setIsLoading(isPending));
  }, [isPending]);

  useApiFeedback(
    isError,
    error,
    isSuccess,
    (data?.message || "Note updated successfully") as string,
  );

  const handleClick = async () => {
    if (action !== "View") {
      await mutateAsync({
        requestBody: { ...vitalNote, note: { ...vitalNote.note, name: note } },
        xTenantId: GetTenantId(),
      });
      action !== "View" && refetch();
    }
    onClose();
  };

  return (
    <form>
      <Grid rowGap={2} container flexDirection={"column"}>
        <Grid container flexDirection={"column"}>
          <Grid container rowGap={1} columnGap={1} mb={2}>
            {vitalNote.vitalName === "Blood Pressure" && (
              <>
                <Typography variant="bodySmall" fontWeight={550}>
                  {vitalNote.vitalName} : {` ${vitalNote.value1}`}
                  {" / "}
                  {` ${vitalNote.value2}`} {` ${vitalNote.unit}`}
                </Typography>
                <Typography variant="bodySmall" fontWeight={550}>
                  {" "}
                  recorded on{" "}
                </Typography>
                <Typography variant="bodySmall" fontWeight={550}>
                  {vitalNote?.recordedDate
                    ? format(
                        parseISO(vitalNote?.recordedDate),
                        "MM/dd/yy, hh:mm a",
                      )
                    : ""}
                </Typography>
              </>
            )}
            {vitalNote.vitalName !== "Blood Pressure" && (
              <Grid container>
                <Typography variant="bodySmall" fontWeight={550}>
                  {vitalNote.vitalName} : {` ${vitalNote.value1}`}{" "}
                  {` ${vitalNote.unit}`}
                </Typography>
                <Typography variant="bodySmall" fontWeight={550}>
                  &nbsp;recorded on &nbsp;
                </Typography>
                <Typography variant="bodySmall" fontWeight={550}>
                  {vitalNote?.recordedDate
                    ? format(
                        parseISO(vitalNote?.recordedDate),
                        "MM/dd/yy, hh:mm a",
                      )
                    : ""}
                </Typography>
              </Grid>
            )}
            <Typography variant="bodySmall" fontWeight={550}></Typography>
          </Grid>
          {action !== "View" && (
            <CustomTextArea
              placeholder={"Enter note here..."}
              name={"note"}
              value={note || ""}
              minRow={2}
              onChange={function (e: ChangeEvent<HTMLTextAreaElement>): void {
                setNote(e.target.value);
              }}
            />
          )}
          {action === "View" && (
            <Grid container>
              <Typography
                variant="bodySmall"
                sx={{
                  overflowWrap: "break-word",
                  wordWrap: "break-word",
                  width: "440px",
                }}
              >
                {note}
              </Typography>
            </Grid>
          )}
        </Grid>
        <Grid container justifyContent={"flex-end"}>
          <Button
            onClick={handleClick}
            startIcon={action === "Add" ? <DoneOutlinedIcon /> : <></>}
            variant="contained"
            disabled={
              (note && note.trim()?.length < 2) || note.trim() === ""
                ? true
                : false
            }
          >
            <Typography variant="bodySmall">
              {action == "Add"
                ? "Submit"
                : action === "View"
                  ? "Cancel"
                  : "Save"}
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default VitalNoteForm;
