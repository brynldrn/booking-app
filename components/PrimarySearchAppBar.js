import { useContext } from 'react'
import { useRouter } from 'next/router'
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { GlobalContext } from '../context/GlobalContext';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function PrimarySearchAppBar({ back, slug }) {
  const {
    eventsList: [events],
    searchResults: [_, setSearchRes],
    filteredEvents: [filtered],
    page: [currentPage, setCurrentPage],
    pageSize: [currPageSize],
    drawer: [__, setIsDrawerOpen],
    filterActive: [isFilterActive]
  } = useContext(GlobalContext)

  const router = useRouter()

  // search function which fires for each character typed by the user,
  // IDEALLY, this should be DEBOUNCED but I don't have the time to implement it now.
  const handleSearch = (event) => {
    const term = event.target.value
    let res;

    if (term) {
      if (isFilterActive) {
        res = filtered?.filter(e => e.meetingName.toLowerCase().includes(term) || e.host.toLowerCase().includes(term)) || null
      } else {
        res = events.filter(e => e.meetingName.toLowerCase().includes(term) || e.host.toLowerCase().includes(term)) || null
      }
    } else {
      res = null;
    }

    setSearchRes(res)
    setCurrentPage(1)
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {
            back ? (
              <>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="Go back"
                  sx={{ mr: 2 }}
                  onClick={() => router.push('/')}
                >
                  <ArrowBackIcon />
                </IconButton>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ display: { xs: 'none', sm: 'block' }, textTransform: 'uppercase' }}
                >
                  { slug.replace('-', ' ') } Room
                </Typography>
              </>
            ) : (
              <>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  sx={{ mr: 2 }}
                  onClick={() => setIsDrawerOpen(true)}
                >
                  <FilterAltIcon />
                </IconButton>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ display: { xs: 'none', sm: 'block' } }}
                >
                  Booking App
                </Typography>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search???"
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={handleSearch}
                  />
                </Search>
              </>
            )
          }
          <Box sx={{ flexGrow: 1 }} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
