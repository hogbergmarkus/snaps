# Snaps

![Am I responsive](documentation/screenshots/am_i_responsive.png)

## Introduction

[Snaps](https://snaps-frontend-871b3764ee9c.herokuapp.com/) is a photo sharing website,
aimed a people who want to share their photos with others.

As well as uploading your content, all photos uploaded to the website are eligible to be downloaded by any user.

The idea is to create a sharing community where you can either take part in adding content,

or just scroll to enjoy what others have created.

You can also engage in the community through comments and likes, as well as create collections for yourself,

by adding posts to your private albums so you can easily find your favorite posts.

## Table of Contents

- [Snaps](#snaps)
  - [Introduction](#introduction)
  - [Table of Contents](#table-of-contents)
  - [User Personas](#user-personas)
  - [User Stories](#user-stories)
  - [User Goals](#user-goals)
    - [The Casual](#the-casual)
    - [Amateur Photographer](#the-amateur-photographer)
    - [The Enthusiast](#the-enthusiast)
  - [Website Owner Goals](#website-owner-goals)
  - [Design](#design)
    - [Wireframes](#wireframes)
    - [Fonts](#fonts)
    - [Colors](#colors)
  - [Screenshots of Finished Website](#screenshots-of-finished-website)
  - [Features](#features)
  - [Features to Add](#features-to-add)

## User Personas

- The **casual user**, who enjoys scrolling through beautiful photos to relax and get inspiration.

  They like discovering new photography styles and sometimes download an image for personal use.

  They enjoy the ease of being able to save their favorite photos in albums, to find them later.

- The **amateur photographer**, likes to share their photos with others for the feedback.

  They enjoy seeing how their creations are received and the idea of contributing to the community.

  The platform offers them easy uploads and exposure.

  The ability to sort their own and other users content in albums is a big bonus.

- The **enthusiast**, collects and organizes everything. They enjoy curating collections,

  to show off to family and friends. It has to be easy adding albums and posts,

  since they log in often to explore, download and organize their private albums.

## User Stories

My user stories that drove the development of this website can be found in this
[GitHub Project](https://github.com/users/hogbergmarkus/projects/16).

Each issue contains an Epic, User Story, Acceptance Criteria and Tasks.

Agile methodology was implemented through labels, milestone and GitHub Projects itself to plan my work.

For the full view, please see the Project link, however here are my user stories in short:

- Authentication

  - As a Site User I can access a navbar from every page so that I can navigate the site
    easily.

  - As a Site User I can register an account so that I can access more features.

  - As a Site User I can sign in so that I get access to additional features.

  - As a Site User I can see my logged in status so that I can log out if I need to.

  - As a Site User I can remain logged in for some time, or until I log out so that I have a
    good experience.

- Posts

  - As a Site User I can add posts so that I can share my content.

  - As a Site User I can view a single post so that I can interact with it.

  - As a Site User I can like a post so that I can show appreciation.

  - As a Site User I can download a post image so that I can keep it for later.

  - As a Site User I can view a feed of posts so that I can get the latest content.

  - As a Site User I can view posts I have liked so that I can find my way back to them easily.

  - As a Site User I can search for posts so that I can find content I'm looking for.

  - As a Site User I can scroll infinitely so that I never have to click next page to see more
    posts.

  - As a Site User I can delete my post so that I can remove it if I want.

  - Site User I can edit my post so that I can change it if I want to.

- Comments

  - As a Site User I can add comments to a post so that I can engage with the community.

  - As a Site User I can view comments so that I can read what other users think of the post.

  - As a Site User I can delete my comments so that I can remove them if I want to.

  - As a Site User I can edit my comments so that I can change them if I want to.

  - As a Site User I can like comments so that I can show people I liked what they said.

  - As a Site User I can unlike a comment so that I can change my mind.

- Albums

  - As a Site User I can create albums so that I can get organized.

  - As a Site User I can view my albums so that I can interact with them.

  - As a Site User I can delete my albums so that I can remove them if I want to.

  - As a Site User I can edit my albums so that I can change their names if I want to.

  - As a Site User I can add posts to albums so that I can sort content as I want to.

  - As a Site User I can view posts I have added to my albums so that I can find the posts I want.

- Profiles

  - As a Site User I can visit other users profiles so that I can learn more about them.

  - As a Site User I can edit my profile so that I can change what users see about me.

## User Goals

### The Casual

They are looking to discover new styles of photography and trends.

Relaxation of scrolling is a large part of why they are here.

### The Amateur Photographer

These users are looking to upload and share their content with the community.

Feedback is important, through likes, comments and seeing how many times their work was downloaded.

The site offers them visibility for their work.

### The Enthusiast

The enthusiast is driven by the curation of beautiful works.

They take pride in finding awesome pieces and collecting them in albums.

## Website Owner Goals

The owner is driven by increasing traffic to the website.

The more users that use the website, they can build out features to make existing users happier,

and at the same time attract new users.

This could mean higher add revenues, and potential subscription features.

The features added have to be selected carefully to not alienate existing users.

The website has to work on both mobile and larger devices for ease of use.

## Design

### Wireframes

The following wireframes were created using [Figma](https://www.figma.com/)

I followed them during my development, though some changes have been made during that process.

![Home](documentation/wireframes/wireframe_1_home.png)

![Sign in](documentation/wireframes/wireframe_2_signin.png)

![Register](documentation/wireframes/wireframe_3_register.png)

![Signed in](documentation/wireframes/wireframe_4_signed_in.png)

![Profile](documentation/wireframes/wireframe_5_profile.png)

![Albums](documentation/wireframes/wireframe_6_albums.png)

### Fonts

My main font used is "Playfair Display SC" which I used for its elegant style.

I paired it with "Gelasio" for input fields and areas with more text, for better readability.

I feel that these fonts in conjunction help create a sense of style and class.

### Colors

I mainly relied on a black and white interface, both for a clean look but also to let the colors

of the images on the website really stand out and take the main stage.

## Screenshots of Finished Website

This is the home page, with a user signed in.

![Home page](documentation/screenshots/home_page.png)

On the post detail page there are comments and ability to add post to an album.

![Post Detail](documentation/screenshots/post_detail.png)

When you go to add a post, there is a nice preview of your selected photo.

![Add Post](documentation/screenshots/add_post.png)

The dropdown for a signed in user applies both in the main navbar and the offcanvas on small devices.

![Menu Dropdown](documentation/screenshots/menu_expand.png)

This is the albums page, where users can manage their albums.

![Albums Page](documentation/screenshots/albums_page.png)

On the profile page, is the users photo of choice, their username and a bio, followed by all their posts.

![Profile Page](documentation/screenshots/profile_page.png)

## Features

- Navbar is active, to display where you are on the website.

  This helps make navigation easier.

![Navbar](documentation/screenshots/active_navbar.png)

- Navbar is responsive, and will expand on large screens to reduce clicks, which helps navigate the site.

![Responsive Navbar](documentation/screenshots/responsive_navbar.png)

- When a user is signed in, the links specific to them are consolidated under their name,

  to reduce clutter, which looks nice but also make their things easy to find.

![Navbar User Dropdown](documentation/screenshots/signed_in_user_dropdown_navbar.png)

- The search field is helpful for users who want to find specific content.

![Search](documentation/screenshots/search.png)

- The feeds with posts have an infinite scroll which loads new posts as the user reaches the bottom.

  Useful for the users to not have to click between pages.

![Infinite Scroll](documentation/screenshots/infinite_scroll.png)

- A users avatar can be hovered to see their username right away.

  This helps users se more info with fewer clicks.

![Avatar Hover](documentation/screenshots/avatar_hover.png)

- Under a post additional information can be seen, such as likes, comments, downloads and image description.

  This helps users understand how their posts are performing.

  Moreover this is where users can click to like or download the image, or just read the description.

  It also shows when the post was updated last.

![Post info](documentation/screenshots/post_information.png)

- Further down when viewing a single post, a user can add the post to one of their albums from a dropdown.

  This makes it easy for users so curate their content.

![Add Post to Album](documentation/screenshots/add_post_to_album.png)

- Just below where a post can be added to an album, the comments start.

  This is where users go to add to the conversation about a post.

  Comments can be liked. The owner of a comment can edit or delete their comment.

![Comment Section](documentation/screenshots/comment_section.png)

- This little dropdown arrow toggle is found throughout the website.

  It is a dropdown menu that allows users options to edit or delete their content.

  It only appears at content they are eligible to modify,

  such as posts, comments, albums and their profile.

![Owner Dropdown](documentation/screenshots/owner_dropdown.png)

- In relevant places I have added success toast notifications.

  It helps reassure the user their actions were successful.

![Success Toast](documentation/screenshots/success_toast.png)

- In case of certain errors, a toast notification will let the user know

  that something went wrong. This will help in understanding why their action

  did not seem to do what they expected.

![Error Toast](documentation/screenshots/error_toast.png)

- If a user visits the Liked Posts page, they will find all the posts they have liked.

  This is a faster way of saving content for the user, but can't be organized as well as albums.

![Liked Posts](documentation/screenshots/liked_posts.png)

- If a user wants to save content in an organized manner, the albums page is the place to do so.

  They can create albums here, and then save content to them as they please.

![Albums](documentation/screenshots/albums.png)

- In case a user does not understand what this page is for, there is a dropdown info panel

  that they can click to read more. This will be especially useful to new users.

![Albums Info](documentation/screenshots/albums_info.png)

- Users profiles can be visited. This page holds their profile image, username and bio.

  All posts on this page belong to that profile owner.

  This is useful for many reasons, such as learning more about a user if they chose to add a bio,

  or just find more images from a creator you like.

![User Profiles](documentation/screenshots/user_profiles.png)

## Features to Add

This is a list of features I would have liked to add, but they did not make it into the

scope of this project. Also, this list is of course non exhaustive.

- **Keep page scroll**. When a user clicks a post and then returns to the feed,

  they should be returned to where they were in the feed.

- **Standard albums**. When a user creates an account, there could be one or more albums

  added automatically, such as "Favorites" for example.

- **Album naming**. I made a conscious choice to let users create albums without a title.

  The album will then default to "New Album", and they can rename it later.

  However it might be a good idea to not allow albums with the same name for a better user experience,

  so a feature that could be implemented it this:

  If an album receives a title already used by another one of their albums such as "Album",

  the new one could be automatically renamed "Album(1)" for example.

- **Editing posts in albums**. Currently there is no feature to move posts between albums,

  or delete a post from an album. The albums themselves can be renamed or deleted, and a post can

  be added to multiple albums, but simply moving a post to another album, or remove it, is not featured yet.

  This is definitely a feature that I would add in the future.
