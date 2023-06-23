package com.oguogu.m59s.model.service;

import com.oguogu.m59s.entity.Game;
import com.oguogu.m59s.entity.GameImage;
import com.oguogu.m59s.entity.MiniGame;
import com.oguogu.m59s.entity.MiniGameDetail;
import com.oguogu.m59s.model.dto.*;
import com.oguogu.m59s.model.dto.GameDto;
import com.oguogu.m59s.repository.GameImageRepository;
import com.oguogu.m59s.repository.GameRepository;
import com.oguogu.m59s.repository.MiniGameDetailRepository;
import com.oguogu.m59s.repository.MiniGameRepository;
import org.apache.catalina.Store;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class GameServiceImpl implements GameService{

    @Autowired
    MiniGameRepository miniGameRepository;
    @Autowired
    MiniGameDetailRepository miniGameDetailRepository;
    @Autowired
    GameRepository gameRepository;
    @Autowired
    GameImageRepository gameImageRepository;

    @Override
    public List<MiniGameInfoDto> listMiniGame(long gameId) {
        List<MiniGame> miniGames = miniGameRepository.findAllByGameId(gameId);
        System.out.println("MINIGAME(0) : "+miniGames.get(0));
        List<MiniGameInfoDto> miniGameInfoDtos = new ArrayList<>();
        for (MiniGame miniGame : miniGames) {
            MiniGameDto dto = miniGame.toDto();
            MiniGameDetailDto miniGameDetailDto = miniGameDetailRepository.findById(dto.getMiniGameDetail().getMiniGameDetailId()).get().toDto();
            MiniGameInfoDto miniGameInfoDto = new MiniGameInfoDto(dto.getMiniGameId(),dto.getClearTime(),dto.getScore(), miniGameDetailDto);
            miniGameInfoDtos.add(miniGameInfoDto);
        }
        return miniGameInfoDtos;
    }

    @Override
    public List<GameDto> listGame(long userId) {
        System.out.println("aaaaaaaaaaaa");
        List<Game> gameList = gameRepository.findAllByUserId(userId);
        for(int i=0;i<gameList.size();i++){
            System.out.println(i);
            System.out.println(gameList.get(i));
        }
        System.out.println("bbbbbbbbbbbb");
        List<GameDto> gameDtoList = new ArrayList<>();
        gameList.sort(null);
        for (Game game : gameList) {
            GameDto dto = game.toDto();
            gameDtoList.add(dto);
        }
        return gameDtoList;
    }
    @Override
    public List<GameImageDto> listGameImage(long miniGameId) {
        List<GameImage> gameImageList = gameImageRepository.findAllByMiniGameId(miniGameId);
        List<GameImageDto> gameImageDtoList = new ArrayList<>();
        for(GameImage gameImage : gameImageList){
            GameImageDto gameImageDto = gameImage.toDto();
            gameImageDtoList.add(gameImageDto);
        }

        return gameImageDtoList;
    }
    @Override
    public long findGameLastIndex() {
        List<Game> list = gameRepository.findAll();
        Collections.sort(list);
        Game game = list.get(list.size()-1);
        return game.getGameId() + 1;
    }

    @Override
    public long findMiniGameLastIndex() {
        List<MiniGame> list = miniGameRepository.findAll();
        Collections.sort(list);
        System.out.println("LIST "+list.size());
        MiniGame miniGame = list.get(0);
        System.out.println("MINGAMEeeeeeeeee " + miniGame);
        return miniGame.getMiniGameId();
    }

    @Override
    public void saveGameImage(GameImageDto gameImageDto) {
        gameImageRepository.save(gameImageDto.toEntity());
    }
    @Override
    public void saveMiniGame(MiniGameDto miniGameDto) {
        miniGameRepository.save(miniGameDto.toEntity());
    }

    @Override
    public void saveGame(GameDto gameDto) {
        gameRepository.save(gameDto.toEntitiy());
    }

    @Override
    public void updateGame(GameDto gameDto) {
        gameRepository.save(gameDto.toEntitiy());
    }
}
