"# avis"
Team Name: The Goo
Field: Media & Awareness
Product Name: Avis

Ideation:

1. As our category was “Media & Awareness,” we first intended to raise awareness by visualizing critical social issues like war and environmental problems through an interactive real-time map.
2. However, having talked to the first mentor who visited us, we came to the conclusion that simply creating a map of “disasters” would be too overwhelming for an end user.
3. We had to personalize the user experience and, most importantly, “humanize” the data, positively influencing our users to not only be aware of problems but also take the initiative.
4. By “humanizing” the data, we attempted to focus more on the traumatizing experiences of individuals rather than simply listing out the consequences of a particular disaster, such as the unfortunate number of death tolls and demolished buildings. Here, we created the idea of “personal stories” that will be discussed below.
5. Still, we thought that the idea of a geographical map that displays various disasters would help to spread awareness, instead of mitigating it. It will allow our users to see what is happening “out there,” in places they have probably never heard of before.
6. After careful research, we decided to focus solely on environmental issues since displaying all other types of crises would have turned out to be too overwhelming.
7. However, recognizing that simply visualizing the data will not drive much of the change, we have decided to add the functionality of donating to various charities that address specific environmental issues shown in our map.
8. After tackling these challenges, we finally reached the business aspect of our idea development, where we identified two sustainable sources of profit: collaboration with charities and government tourism agencies and investment from non-governmental organizations (NGOs).

Technological solutions:
● We have created a website platform with a built-in Google Maps map of recent disasters and stories shared by people who were direct witnesses of these tragedies.
● For the front end, we use React.js for dynamic parsing of the data received from our API, which was built using Django Rest Framework (back end).
● Due to the lack of free and reliable APIs to fetch real-time data on environmental catastrophes, we have compiled our own relatively small database of the recent natural disasters that occurred throughout the world for the whole purpose of showcasing the main functionalities of our project.
○ When we raise enough money, we will certainly buy a monthly/yearly subscription to provide real-time data.
● For the core functionalities, we used the concept of bidirectional mapping to create an interactive experience between a user and a map and a list of disasters, their descriptions, and photos (and, if available, videos).
● We also have a login & registration page, personal stories, and the function to donate to charity organizations.

Social issues
● Not every charity organization can be trusted, and many people are often confused about which charities they can trust their finances. Therefore, as we provide the functionality of donating, we have to make sure that those donations are transparent. We solve this problem by providing fact-checked information about the background of big, respected charities, which we list as trustworthy sources.

What is next?
● Building upon the idea of earning money to make the project sustainable, we will introduce the idea of “community projects,” which will enable people who are interested in helping mitigate the consequences of recent disasters to be directly involved in this process by volunteering to, say, build houses (in case of earthquakes).
● To further motivate our users to commit to helping solve environmental issues, we will introduce the “cause of the week,” which, as the name suggests, will describe the disaster that needs to be addressed urgently and on a large scale. One way we can do this is through sending weekly emails.
