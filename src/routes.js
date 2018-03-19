import React from 'react';

import { Route, Redirect, IndexRoute, IndexRedirect } from 'react-router';

import c from './components';

import withTracker from './withTracker.jsx';

const routes =
    <Route>
        <Redirect from='index.html' to='/' />
        <Route path='experiences' component={withTracker(c.Layout)} >
            <IndexRoute component={withTracker(c.Experiences)} />
            <Route path='new' exact component={withTracker(c.ExperienceNew)} />
            <Route path='search' exact component={withTracker(c.Search)} />
            <Route path=':experienceId' exact component={withTracker(c.Show)} />
            <Route path=':experienceId/edit' exact component={withTracker(c.ExperienceEdit)} />
        </Route>
        <Route path='users' component={withTracker(c.Layout)} >
            <IndexRedirect to='sign_in' />
            <Route path='sign_in' exact component={withTracker(c.SignIn)} />
            <Route path='sign_up' exact component={withTracker(c.SignUp)} />
            <Route path='profile' exact component={withTracker(c.EditUser)} />
            <Route path='edit' exact component={withTracker(c.EditPassword)} />
        </Route>
        <Route path='book' component={c.Layout} >
            <Route path=':experienceId' component={withTracker(c.BookingsNew)} />
        </Route>
        <Route path='bookings' component={withTracker(c.Layout)} >
            <IndexRoute component={withTracker(c.Bookings)} />
            <Route path=':bookingId' exact component={withTracker(c.BookingsShow)} />
        </Route>
        <Route path='about' component={withTracker(c.Layout)} >
          <IndexRoute exact component={withTracker(c.AboutUs)} />
        </Route>
        <Route path='help' component={withTracker(c.Layout)} >
          <IndexRoute exact component={withTracker(c.Help)} />
        </Route>
        <Route path='partners' component={withTracker(c.Layout)} >
          <IndexRoute exact component={withTracker(c.Partners)} />
        </Route>
        <Route path='/' component={withTracker(c.Layout)} >
            <IndexRoute component={withTracker(c.Home)} />
        </Route>
    </Route>;

export default routes;
