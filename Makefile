# Do not use this Makefile without knowing what it does, some commands
# here are destructive and can cause a data loss.

# Where to publish the website, this can be a ssh destination or a
# path to a directory. All files under this directory are
# automatically deleted if not part of the website.
TARGET := sbrk.org:dockerz/docker-detours/data

all:
	hugo serve

publish:
	hugo && rsync -avz --delete public/ $(TARGET)
