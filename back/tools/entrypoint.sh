#!/bin/sh

# Check if the database is using PostgreSQL
echo "Entro en script"
if [ "$DBASE" = "postgreSQL" ]
then
    # Wait for the database to be ready
    # This is necessary because the database container may not be ready to accept connections when the web container starts
    echo "Waiting for the database to be ready..."
    while ! nc -z $POSTGRES_HOST $POSTGRES_PORT;
    do
        sleep 0.1;
    done;
    echo "Database ready"
fi

echo "despues de condition"

# Apply database migrations
python manage.py makemigrations
python manage.py migrate

# Run the server
python manage.py runserver 0.0.0.0:8000 2>&1

exec "$@"
