import React from 'react';

import { Route, Redirect, IndexRoute, IndexRedirect } from 'react-router';

import c from './components';


const routes =
    <Route>
        {/* <Redirect from='/' to='index' /> */}
        <Route path='experiences' component={c.Layout} >
            <IndexRoute component={c.Experiences} />
            <Route path='new' exact component={c.ExperienceNew} />
            <Route path='search' exact component={c.Search} />
            <Route path=':experienceId' exact component={c.Show} />
            <Route path=':experienceId/edit' exact component={c.ExperienceEdit} />
        </Route>
        <Route path='users' component={c.Layout} >
            <IndexRedirect to='sign_in' />
            <Route path='sign_in' exact component={c.SignIn} />
        </Route>
        <Route path='bookings' component={c.Layout} >
            <IndexRoute component={c.Bookings} />
            <Route path=':bookingId' exact component={c.BookingsShow} />
        </Route>
        <Route path='/' component={c.Layout} >
            <IndexRoute component={c.Home} />
        </Route>
    </Route>;

export default routes;