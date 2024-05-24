import streamlit as st


def main():
    st.title("My Portfolio")

    # Introduction Section
    st.header("About Me")
    st.write(
        """
        Hello! I'm [Your Name], a data science and machine learning consultant. Here you can view some of my work
        and get in touch with me.
    """
    )

    # Project Section
    st.header("Projects")
    col1, col2, col3 = st.columns(3)
    with col1:
        st.image("path_to_image.jpg", caption="Project 1")
        st.write("Project 1 Description")
    with col2:
        st.image("path_to_image.jpg", caption="Project 2")
        st.write("Project 2 Description")
    with col3:
        st.image("path_to_image.jpg", caption="Project 3")
        st.write("Project 3 Description")

    # Contact Section
    st.header("Contact Me")
    with st.form("Contact Form"):
        name = st.text_input("Name")
        email = st.text_input("Email")
        message = st.text_area("Message")
        # submitted = form_submit_button("Send")

        if submitted:
            st.write("Thanks for your message, we will get back to you shortly!")


if __name__ == "__main__":
    main()
