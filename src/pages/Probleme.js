import React, { useContext, useEffect } from "react";
import { fade, makeStyles, withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import MuiAccordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { RootContext } from "./../contexts/Context";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Chip from "@material-ui/core/Chip";
import HomeIcon from "@material-ui/icons/Home";
import LaunchIcon from "@material-ui/icons/Launch";
import Box from "@material-ui/core/Box";
import { Link, useParams } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import Divider from "@material-ui/core/Divider";
import CustomRating from "./../components/CustomRating";
import Alert from "@material-ui/lab/Alert";
import VisibilityTwoToneIcon from "@material-ui/icons/VisibilityTwoTone";
import Sidebar from "./../components/Sidebar";
import MetaTags from "react-meta-tags";
import NotFound from "./../components/NotFound";
import AdSense from "react-adsense";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import SortTwoToneIcon from "@material-ui/icons/SortTwoTone";
import { DataGrid } from '@material-ui/data-grid';
import { useHistory, useLocation } from "react-router-dom";
import {
  TransitionGroup,
  CSSTransition
} from "react-transition-group";
import { DelayedRenderer } from "react-delayed-renderer"
import PageSkeleton from "./../components/PageSkeleton";

const useStyles = makeStyles((theme) => ({
  header: {
    margin: theme.spacing(3, 0, 0, 0),
    textAlign: "left",
  },
  divider: {
    margin: theme.spacing(3, 0),
  },
  shownOnXs: {
    display: "none",
    [theme.breakpoints.down("xs")]: {
      display: "block",
    },
  },
  shownOnSm: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  },
  dataGridRoot: {
    border: "none"
  },
  dataGridCell: {
    
  },
  row: {
    "&.g": {
      background: fade(theme.palette.success.main, 0.33)
    },
    "&.r": {
      background: fade(theme.palette.error.main, 0.33)
    }
  }
}));

export default function Probleme() {

  let history = useHistory();

  const { API } = useContext(RootContext);

  const defaultState = {
    dataLoaded: false,
    data_loading: false,
    problems: [],
    success: null,
    errorMsg: null,
    responseCode: null,
  };

  const [state, setState] = React.useState(defaultState);

  const classes = useStyles();

  const rows = state.problems;

  const columns = [
    { 
      field: 'id', 
      headerName: 'ID', 
      flex: 0.75, 
    },
    { 
      field: 'name', 
      headerName: 'Nume', 
      flex: 1, 
      renderCell: (params) => {
        return <b><Link to={`/problema/${params.row.name}`}>{params.row.name}</Link></b>
      },
    },
    { 
      field: 'a_c', 
      headerName: 'Acces??ri', 
      flex: 1, 
      renderCell: (params) => {
        return <>{params.row.a_c} {params.row.a_c === 1? "acc." : "acc."}</>
      },
    },
    { 
      field: 's_c', 
      headerName: 'Solu??ii', 
      flex: 1, 
      renderCell: (params) => {
        return <>{params.row.s_c} {params.row.s_c === 1? "sol." : "sol."}</>
      },
    },
    { 
      field: 'v_c', 
      headerName: 'Viz. sol.', 
      flex: 1, 
      renderCell: (params) => {
        return <>{params.row.v_c} {params.row.v_c === 1? "viz. sol." : "viz. sol."}</>
      },
    },
    {
      field: 'action',
      headerName: 'Ac??iuni',
      flex: 1,
      renderCell: (params) => {
        return <Link to={`/problema/${params.row.name}`} style={{width: "100%"}}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            disableElevation
            style={{width: "100%"}}
          >
            Deschide
          </Button>
        </Link>
      },
    }
  ];

  useEffect(() => {

    async function logon() {

      await API("endpoint/page/probleme.php").then((logonResponse) => {
        setState({
          ...state,
          dataLoaded: true,
          success: logonResponse.success,
          errorMsg: logonResponse.errorMsg,
          problems: logonResponse.problems,
          responseCode: logonResponse.responseCode,
        });
      })

    }

    logon()

  }, [])

  let location = useLocation()

  return (
    <>
    {!state.dataLoaded && <PageSkeleton type="problem" /> }
    {state.dataLoaded && state.success && <Container maxWidth="md">
        <Grid container>
              <MetaTags>
                <title>
                  Lista problemelor de pe PbInfo cu solu??ii | SOLINFO.ro
                </title>
              </MetaTags>
              <Grid item xs={12} className={classes.header}>
                <Grid container justify="center" alignItems="center">
                  <Grid item xs={12}>
                    <Typography variant="h5" component="h1">
                      Probleme
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Divider className={classes.divider} />
              </Grid>
              <Grid item xs={12} sm={8} md={9}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12}>
                    <Typography variant="h6" component="h2">
                      Lista problemelor disponibile
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1" component="p">
                      ??n tabelul de mai jos g??se??ti toate probleme disponibile. Problemele colorate ??n verde au cel pu??in o solu??ie, iar cele colorate cu ro??u nu au ??nc?? niciuna.
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Paper className="cool-sha" style={{width: "100%", overflow: "scroll"}}>
                      <div style={{minWidth: "700px"}}>
                        <DelayedRenderer delay={300}>
                        <DataGrid 
                          style = {{width: "100%"}}
                          disableSelectionOnClick
                          getRowClassName={(params) =>
                            `${classes.row} ${params.row.s_c > 0? "g" : "r"}`
                          }
                          columns={columns} 
                          rows={rows} 
                          isRowSelectable={false} 
                          autoHeight
                          classes={{
                            root: classes.dataGridRoot,
                            cell: classes.dataGridCell
                          }}
                          rowHeight={40}
                          pageSize={50}
                          rowsPerPageOptions={[50]}
                          localeText={{
                            noResultsOverlayLabel: 'Niciun rezultat.',
                            toolbarColumns: 'Coloane',
                            toolbarFilters: 'Filters',
                            toolbarFiltersLabel: 'Vezi filtrele',
                            toolbarFiltersTooltipHide: 'Ascunde filtrele',
                            toolbarFiltersTooltipShow: 'Vezi filtrele',
                            toolbarFiltersTooltipActive: (count) =>
                              count !== 1 ? `${count} filtre active` : `${count} filtru activ`,
                            columnsPanelTextFieldPlaceholder: 'Column title',
                            columnsPanelDragIconLabel: 'Reorder column',
                            columnsPanelShowAllButton: 'Arat?? tot',
                            columnsPanelHideAllButton: 'Ascunde tot',
                            filterPanelAddFilter: 'Adaug?? foltru',
                            filterPanelDeleteIconLabel: '??terge',
                            filterPanelOperators: 'Operatori',
                            filterPanelOperatorAnd: '??i',
                            filterPanelOperatorOr: 'Sau',
                            filterPanelColumns: 'Coloan??',
                            filterPanelInputLabel: 'Valoare',
                            filterPanelInputPlaceholder: 'Valoare',
                            filterOperatorContains: 'con??ine',
                            filterOperatorEquals: 'este egal cu',
                            filterOperatorStartsWith: '??ncepe cu',
                            filterOperatorEndsWith: 'se termin?? cu',
                            filterOperatorIs: 'este',
                            filterOperatorNot: 'nu este',
                            filterOperatorAfter: 'este dup??',
                            filterOperatorOnOrAfter: 'is on or after',
                            filterOperatorBefore: 'este ??nainte',
                            filterOperatorOnOrBefore: 'is on or before',
                            filterValueAny: 'oricare',
                            filterValueTrue: 'adev??rat',
                            filterValueFalse: 'fals',
                            columnMenuLabel: 'Menu',
                            columnMenuShowColumns: 'Arat?? coloane',
                            columnMenuFilter: 'Filtru',
                            columnMenuHideColumn: 'Ascunde',
                            columnMenuUnsort: 'Anuleaz?? sortarea',
                            columnMenuSortAsc: 'Sorteaz?? ASC',
                            columnMenuSortDesc: 'Sorteaz?? DESC',
                            columnHeaderFiltersTooltipActive: (count) =>
                              count !== 1 ? `${count} filtre active` : `${count} filtru activ`,
                            columnHeaderFiltersLabel: 'Arat?? filtrele',
                            columnHeaderSortIconLabel: 'Sorteaz??',
                            footerTotalRows: 'Linii:',
                            booleanCellTrueLabel: 'adev??rat',
                            booleanCellFalseLabel: 'fals',
                            MuiTablePagination: {},
                            columnsPanelTextFieldLabel: 'G??se??te coloan??',
                            columnsPanelTextFieldPlaceholder: 'Titlu coloan??',
                            columnsPanelShowAllButton: 'Arat?? tot',
                            columnsPanelHideAllButton: 'Ascunde tot',
                            footerTotalVisibleRows: (visibleCount, totalCount) =>
                              `${visibleCount.toLocaleString()} din ${totalCount.toLocaleString()}`,
                            MuiTablePagination: {
                              labelRowsPerPage: "Probleme pe pagin??",
                              labelDisplayedRows: ({from, to, count}) => `${from}-${to} din ${count}`
                            }
                          }}
                        />
                        </DelayedRenderer>
                      </div>
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <Box pt={3} className={classes.shownOnXs} />
                <Sidebar />
              </Grid>
        </Grid>
      </Container>}
    </>
  );
}
