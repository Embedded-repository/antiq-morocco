FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY ["src/AntiqMorocco.API/AntiqMorocco.API.csproj", "src/AntiqMorocco.API/"]
COPY ["src/AntiqMorocco.Application/AntiqMorocco.Application.csproj", "src/AntiqMorocco.Application/"]
COPY ["src/AntiqMorocco.Domain/AntiqMorocco.Domain.csproj", "src/AntiqMorocco.Domain/"]
COPY ["src/AntiqMorocco.Infrastructure/AntiqMorocco.Infrastructure.csproj", "src/AntiqMorocco.Infrastructure/"]
RUN dotnet restore "src/AntiqMorocco.API/AntiqMorocco.API.csproj"
COPY . .
WORKDIR "/src/src/AntiqMorocco.API"
RUN dotnet build -c Release -o /app/build

FROM build AS publish
RUN dotnet publish -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app
EXPOSE 8080
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "AntiqMorocco.API.dll"]
