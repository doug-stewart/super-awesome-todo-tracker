# Architectural Overview for Super Awesome Todo Tracker

**Completed in:** [TBD]

## Purpose

To build a simple todo tracking application as part of a skills evaluation test.

### External Requirements

- [] View a list of todos that persists between sessions.
- [] Todo management: Add, remove, update.
- [] Cross-platform compatibility (desktop and mobile including iOS and Android).

#### Additional MVP Features

While not part of the initial requirements, I plan to include the following features to enhance
usability and user experience:

- [] **Light and Dark Mode Support:** CSS gives us this almost for free so why not?
- [] **Drag-and-Drop Reordering:** Adding a little drag and drop functionality greatly improves any
  UI.
- [] **A little surprise:** I don't know, maybe try some things and see what happens...

## Technical Design

### Interpretation of "cross-platform"

For now I'm choosing to interpret "cross-platform" as "works well on both desktop and mobile web
browsers". While a full featured native app (or even just a webview wrapper) would provide a better
experience on mobile devices, the time and effort required to build and maintain such apps is beyond
the scope of this test and I would rather focus on delivering a solid singular experience than
spread my efforts too thin.

### Frameworks, Libraries, and Languages

For rapid development and ease of maintenance, I'll be using Vite + React with TypeScript and CSS
Modules for styling. This stack is well-suited for building complex modern web applications quickly
while maintaining type safety and modularity.

#### Why Vite and React

Simply put, Vite and React are a fantastic combination for building modern web apps. While going
with the whatever the zeitgeist deems best isn't always the right choice, in this case it makes
sense.

#### Why TypeScript

While TypeScript does add some development overhead and complexity compared to vanilla JavaScript,
the benefit of having strong typing means we basically make a certain kind of bug impossible to
introduce. While this isn't inherently an issue with a super small todo app, as the app were to
scale with additional features and complexity the benefits of TypeScript would become more
pronounced.

#### Why CSS and CSS Modules

While there are quite a few options for styling these days, very little comes close to CSS + CSS
Modules in terms of simplicity, performance, and scalability. More complex styling tools often limit
your ability to use certain kinds of CSS features or require additional configuration and build
steps that slow down both development and runtime performance.

It should be worth noting that while all styling solutions can create a bloated and buggy mess,
vanilla CSS and CSS Modules require an extra level of attention and discipline to avoid this peril.
However, with proper practices and conventions in place this can be easily managed.

#### Why DND-Kit

While HTML5 does have native drag-and-drop support, it is notoriously difficult to work with,
especially across mobile devices. DND-Kit provides a robust, performant, highly extensible and
customizable drag-and-drop solution that works great across all modern browsers and devices.

#### Why not [insert NPM package here]?

Simply put, I like this stack and find it works very well for a wide variety of projects with
minimal muss and fuss. While there are certainly many other valid options that could be used to
build this, or any, application, I find this stack to be a great balance of developer experience,
performance, and maintainability.

None of these are the absolute perfect choice for any and all projects. When starting a new project
(especially one that's not just a tech test) we would want to take more time to fully evaluate our
options and requirements to make sure we start off on the most solid foundation possible.

### Data Storage and State Management

For simplicity and speed of development, I'll be storing the user's todos in the browser's local
storage. For simple smaller datasets local storage is more than sufficient and avoids the complexity
of using a more robust solution involving indexedDB and a complete backend. There are some
limitations relating to this decision which I'll cover in the Future Improvements section.

Within the app itself I'll utilize Zustand for stage management. Zustand is notoriously lightweight
and performant which will help keep the app nice and snappy even as it scales. Of particular benefit
is Zustand's ability to persist state in local storage with minimal configuration and the way it can
reduce unnecessary re-renders by allowing each component to subscribe only to the specific slices of
state it cares about.

### Project Structure

For simplicity the project will be structured similar to the
[Bulletproof React](https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md)
project structure. I've found this structure to be a great balance of organization and simplicity
that scales well as the app grows in complexity.

## Future Improvements

### Phase 0: Core Features

Let's phase it, this will be a wireframe prototype at best. In order for this to be a truly
shippable product we would need quite a few additional features.

#### 1. User accounts.

For simplicity's sake and due to time constraints Super Awesome Todo Tracker won't have a concept of
users and everything will exist as a single entry inside the browser's local storage. This is not a
long-term solution as it comes with the following critical drawbacks:

- **No privacy:** Without user accounts all data is accessible to anyone with access to the device.
  So probably don't use it on a public library computer.
- **No cross-device sync:** Users (if they existed) won't be able to track and manage their todos
  across their various devices.
- **No backups:** If the user clears their browser data all their todos are lost forever.

To address this we would need to implement a user layer with authentication and authorization. Aside
from the backend concerns, this would include:

- **User registration and onboarding flow.** While a complicated onboarding flow is unnecessary for
  a todo app, a few sample todos to help the user get started would be beneficial.
- **User login flow.** At a minimum this could be a username and password form with email
  verification, but ideally we would support full MFA, passkeys and passwordless login.
- **User account recovery.** Password reset flows and account recovery options.
- **User settings and subscription management.** Users should be able to update their email,
  password, account security, and manage any subscription preferences.

#### 2. Due dates behaviors and reminders.

Currently todos are just a flat list with no concept of due dates or reminders. A fully featured
todo app would include the ability to add due dates with optional reminders and notifications. Users
would also need to be able to sort and group their todos by due date and by past due.

#### 3. Dedicate iOS and Android apps.

While the web app will be fully functional on mobile browsers, a dedicated iOS and Android app would
provide a more seamless experience for mobile users. Such apps could be little more than a webview
wrapper of the web app. This would also allow for more robust notifications and offline support as
well as background tasks.

#### 4. Additional functionality.

A singular broad list of todos is a good start but we'd want to consider additional features and
whether or not we thought they were core and necessary for initial release.

- Categories and tags to allow users to group and organize their todos based on theme, project, or
  context.
- Sub-tasks to allow users to break down larger todos into smaller, manageable steps.
- Additional lists to allow users to create multiple todo lists for different purposes (e.g., work,
  personal, shopping).
- Collaboration and whether or not we'd need it. User-to-user interaction breaks a whole lot of
  complexity that would need a lot of consideration but for it you get a lot of value for the user.
  It has a high impact on user retention and engagement when done well. Likely this would be shifted
  to an additional phase, potentially phase 2.

### Phase 1: Scalability Enhancements

The biggest improvement for performance would be virtualization for the todo list. A simple todo app
like this can easily take a few hundred todos but on the scale of thousands the rendering
performance will start to degrade. Virtualizing the list would keep the number of in-DOM nodes to a
minimum to ensure smooth interactions and animations.

Initially only the UI would need to be virtualized but if we expected to have a very large dataset
we might also need to consider pagination for loading and unloading todos from the browser state.

I'm sure we'd find more as we continued to iterate on the app.

### Phase 2: Reevaluate Our Assumptions

After the initial release and performance improvements we should have enough user feedback and
retention data to understand what our users actually want and need from our platform. We should take
a moment to reevaluate all the assumptions we make during our previous phases of work to ensure
we're still on the right track.

### Phase 3: User Delight Features

- [] **Natural language input for new todos.** (Ex: "Buy groceries tomorrow at 5pm").
- [] **Add animations for adding/removing/completing todos.** Delightful animations can greatly
  enhance the user experience. They're also a great place to add personality.
- [] **Add custom themes beyond light and dark.** At a minimum we could add a few default color
  schemes with light/dark variants as well as letting the user choose whether their theme follows
  the system preference or is manually selected. This would also be a great way to enhance
  accessibility by allowing high-contrast themes that aren't to everyone's tastes.

### Phase 4: ???

This is too far out to speculate. Are we focusing on user retention and lifecycle? Are there new
features or monetization improvements we need to make? Did we pivot to a new market or audience?
Only time will tell.
