---
title: Trying out Arch Linux + KDE Plasma as an Ubuntu/GNOME daily driver
excerpt: Installing and configuring Arch Linux + KDE Plasma and comparing it to my Ubunutu/GNOME setup
date: 2025-12-01
---

Ubuntu is on the majority of my personal computer systems. I have been able to migrate to Linux systems for all of my needs (excluding live streaming and testing software on Windows). Little time has been spent actually configuring Ubuntu, as I've always preferred a solid, out-of-box experience. This means I have been using GNOME as my primary desktop environment as it comes pre-packaged alongside Ubuntu.

Valve's Steam Deck peaked my interest in KDE Plasma, a different desktop environment for Linux systems. It comes pre-packaged with SteamOS when it is used in Desktop mode. I wanted to try to customize my Linux experience a bit further than using the defaults that come with Ubuntu to increase my knowledge of Linux as a whole and to further customize my experience. For this reason, I also decided to try installing Arch Linux as the operating system and use KDE Plasma as the desktop environment.

I installed Arch Linux on my Lenovo ThinkPad T480s, which is a machine that I use for all use cases: web browsing, software development, video streaming, and light gaming.

The goal of this post is not just to share my initial experience with Arch Linux and KDE Plasma, but also walk through how I installed Arch on my ThinkPad and create a simple guide for me (and maybe you if you are interested) to do the same on other computer systems in the future.

## Installing Arch Linux

For my installation instructions, I will try to be as detailed as possible for how I did it. I followed along with [tony's "How to Install Arch Linux" guide video](), but did a number of things differently because of my setup. I would highly recommend watching this video for installing Linux, as it is made very simple.

A few distinctions that are different than the video is that I installed Arch Linux on my ThinkPad's main NVME SSD, so when it comes to partitioning and mounting the drive, I used the nvme name `nvme0n1` instead of `sdx`. I also obviously chose to install KDE Plasma instead of Cinnamon (another desktop environment).

### Creating Arch Linux disk - USB

After downloading the iso file for Arch Linux, I first assumed that I could use Balena Etcher to directly write it as a bootable drive that I could then boot into from the system's boot menu. However, it seems that I was not able to get this to work. What did work, was using a tool called Ventoy. I simply wrote Ventoy to my USB drive similarly to what I did before, and I moved the Arch Linux iso file into the `/media/user/Ventoy` directory. From here, I was able to boot into Ventoy and select the Arch Linux iso file. From here, I was met with the first part of the installation.

After entering the install medium, I first connected to the internet using my wifi. I followed the Arch wiki guide for this, but ethernet could have worked since I have it on my ThinkPad.

### Partitioning disk

The next step is to partition our disk. I only have a single NVME SSD in my ThinkPad, so I will partition it for the Arch Linux install. I can type `cfdisk` into the terminal, and then select `gpt` as the label type. I started by deleting the existing partitions that were on the drive until I had a single "Free space" on the list of disks. After deleting, I confirmed my changes by selecting the "Write" option at the bottom of cfdisk.

Now that I only have the Free space, the partitions for Arch Linux can be prepared. By selecting "New", we can create the following partitions:
1. Partition size = 1G (represents 1 gigabyte), this will be the boot partition. For me, this was automatically assigned to `/dev/nvme0n1p1`.
2. Partition size = 4G, this will be the swap partition. I understand this to represent what the computer will use if the system runs out of memory instead of crashing the system. This was automatically assigned for me to `/dev/nvme0n1p2`
3. Simply selecting new on the remaining free space, allocating all of it in the last partition. This partition represents our actual file system. This was assigned to `/dev/nvme0n1p3`.

We want to make sure that the partitions to the drives are saved, so we will use the Write option again. Once written, we can use quit to go back to the terminal.

Using the `lsblk` command, we can see our partitions that we just created.

### Formatting the partitions

We will run the command `mkfs.ext4 /dev/nvme0n1p3`, which will make the ext4 file extension to our root partition.

Next, for our boot partition, we run `mkfs.fat -F 32 /dev/nvme0n1p1`.

Finally, for the swap partition, we run `mkswap /dev/nvme0n1p2`.

### Mounting the file systems

We will mount the root partition using `mount /dev/nvme0n1p3 /mnt`.

Next, we mount the boot directory, but need to create its directory first using `mkdir -p /mnt/boot/efi`, then we can mount using `mount /dev/nvme0n1p1 /mnt/boot/efi`

Finally, for the swap partition, we simply write `swapon /dev/nvme0n1p2`.

When we execute `lsblk`, we will see the mounted locations on the root and boot partitions, and `[SWAP]` on the swap partition.

### Installing Linux

We will run `/pacstrap /mnt base linux linux-firmware sof-firmware base-devel grub efibootmgr networkmanager vim`, not all of these are required, but very good for the base system. After hitting enter, it will take a bit to install everything.

Next, type `genfstab /mnt` to ensure the file system looks correct. Then write `genfstab -U >> /mnt/etc/fstab`. This writes the output of `genfstab -U` to the file `/mnt/etc/fstab`. I understand this to mean that this is how your computer will know how to mount the drives on system startup.

We can use `arch-chroot /mnt` to get into the new system.

For configuring the date, we can use the `date` command to verify if it is correct. If it's not, we can use `ln -sf /usr/share/zoneinfo/America/Chicago /etc/localtime` (or your timezone). We can type `date` again to ensure that our date is correct now. Finally, write `hwclock --systohc`.

Next, I used vim to uncomment `en_US.UTF-8` from the `/etc/locale.gen` file then generated the locales using `locale-gen`. Finally, we will write `echo 'LANG=en_US.UTF-8' >> etc/locale.conf`, then `cat /etc/locale.conf` to verify that we wrote `LANG=en_US.UTF=8` to that file.

We will create the hostname of the computer by typing `echo 'hostname' >> /etc/hostname` (replacing the hostname in the quotes with what you want your computer to be called), then we can make a password for the root user using `passwd`, then typing our password.

Then, we will make our personal user for our computer using `useradd -m -G wheel -s /bin/bash yourname`, replacing yourname with your user name. We can set the password for the new user by typing `passwd yourname`. We will give this user access to sudo by typing `EDITOR=vim visudo`, then search for wheel in vim using `/wheel` then hit enter, then delete the line that reads: `%wheel ALL=(ALL:ALL) ALL`.

We can log into our user by typing `su yourname`. We can confimed sudo priviledges by typing `sudo pacman -Syu`. We can exit using `exit`.

To finish the installation, we will enable networkmanager by default so we connect to internet using `systemctl enable NetworkManager`.

### Boot Loader

I prefer grub as my bootloader, so I finished by following the `grub-install /dev/nvme0n1` command, and configured by typing `grub-mkconfig -o /boot/grub/grub.cfg`.

### Using Arch Linux

After rebooting, we are into Arch Linux in a similar way as previous distributions I have used before. The next step for me is to install KDE Plasma.

For my system specifications (i7-8550u and 16GB of RAM), I have not noticed a significant performance different when using GNOME vs KDE Plasma as a desktop environment. It has been relatively straightforward for me to get used to KDE, as I had prior experience with it when I was using my Steam Deck in desktop mode. At this time, I can't say I like it more than GNOME, but we will see over time.
