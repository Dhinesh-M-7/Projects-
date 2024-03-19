from website import create_app

app = create_app("sqlite:///database.db")

if __name__ == '__main__':
    app.run(debug=True)